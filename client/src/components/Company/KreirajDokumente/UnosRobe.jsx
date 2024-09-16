import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDokument } from "../../../features/dokumenti/dokumentThunks.js";
import { useParams } from "react-router-dom";
import { fetchSkladista } from "../../../features/skladista/skladisteThunks.js";
import { fetchPoslovnice } from "../../../features/poslovnice/poslovnicaThunks.js";
import { fetchVrstaDokumenta } from "../../../features/vrstaDokumenta/vrstaDokumentaThunks.js";
import { fetchArtikli } from "../../../features/artikli/artikliThunks.js";
import { fetchKupciDobavljaci } from "../../../features/kupacDobavljac/kupacDobavljacThunk.js";
import { fetchPdv } from "../../../features/dokumenti/dokumentThunks.js";
import { fetchValuta } from "../../../features/valute/valuteThunks.js";
import html2pdf from "html2pdf.js";
import { useReactToPrint } from "react-to-print";
import UlaznaKalkulacija from "../VrsteDokumenata/UlaznaKalkulacija.jsx";
import { ArtikliForm } from "../Forme/ArtikliForm.jsx";
import Drawer from "../../Drawer.jsx";
import KupciDobavljaciForm from "../Forme/KupciDobavljaci.jsx";

export const UnosRobe = () => {
  const contentRef = useRef();
  const dispatch = useDispatch();
  const [naziv, setNaziv] = useState("");
  const [redniBroj, setRedniBroj] = useState(0);
  const [poslovniceId, setPoslovnicaId] = useState(null);
  const [skladisteId, setSkladisteId] = useState(null);
  const [filteredSkladista, setFilteredSkladista] = useState([]);
  const [vrstaDokumentaId, setVrstaDokumentaId] = useState(null);
  const [artikli, setArtikli] = useState([]); // Lista artikala za dokument
  const [odabraniArtikl, setOdabraniArtikl] = useState(null); // Odabrani artikl iz dropdowna
  const [kolicina, setKolicina] = useState(0);
  const [cijena, setCijena] = useState(0);
  const [mpcijena, setMpCijena] = useState(0);
  const [dobavljacId, setDobavljacId] = useState(null);
  const [aktivniPdv, setAktivniPdv] = useState(null);
  const [datumIzdavanjaDokumenta, setDatumIzdavanjaDokumenta] = useState("");
  const [datumKreiranjaKalkulacije, setDatumKreiranjaKalkulacije] =
    useState("");
  const [valutaId, setValutaId] = useState(null);
  const [file, setFile] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);

  const poslovnice = useSelector((state) => state.poslovnica.poslovnice) || [];
  const skladista = useSelector((state) => state.skladiste.skladista);
  const vrstaDokumenta = useSelector(
    (state) => state.vrstaDokumenta.vrsteDokumenata
  );
  const artikliList = useSelector((state) => state.artikl.artikli);
  const kupciDobavljaci = useSelector(
    (state) => state.kupacDobavljac.kupciDobavljaci
  );
  const pdv = useSelector((state) => state.dokument.pdv);
  const valute = useSelector((state) => state.valuta.valute);
  const editMode = useSelector((state) => state.editMode.editMode);

  const { companyId } = useParams();

  const openDrawer = (content) => {
    setDrawerContent(content);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerContent("");
  };

  useEffect(() => {
    dispatch(fetchPoslovnice(companyId));
    dispatch(fetchSkladista());
    dispatch(fetchVrstaDokumenta());
    dispatch(fetchArtikli());
    dispatch(fetchKupciDobavljaci(companyId));
    dispatch(fetchPdv());
    dispatch(fetchValuta());
  }, [dispatch, companyId]);

  useEffect(() => {
    // Filtriranje skladišta na osnovu odabrane poslovnice
    if (poslovniceId) {
      const relevantSkladista = skladista.filter(
        (skladiste) => skladiste.poslovnicaId === Number(poslovniceId)
      );
      setFilteredSkladista(relevantSkladista);
    } else {
      setFilteredSkladista([]);
    }
  }, [poslovniceId, skladista]);

  useEffect(() => {
    const aktivni = pdv.find((p) => p.Aktivan);
    setAktivniPdv(aktivni);
  }, [pdv]);

  // Funkcija za rukovanje promjenom fajla
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitVrsta1 = () => {
    const formData = new FormData();
    formData.append("naziv", naziv);
    formData.append("redniBroj", parseInt(redniBroj, 10));
    formData.append("poslovniceId", parseInt(poslovniceId, 10));
    formData.append("skladisteId", parseInt(skladisteId, 10));
    formData.append("vrstaDokumentaId", parseInt(vrstaDokumentaId, 10));
    formData.append("artikli", JSON.stringify(artikli));
    console.log(artikli);

    formData.append("companyId", companyId);
    formData.append("kupacDobavljacId", parseInt(dobavljacId, 10));
    formData.append("pDVId", parseInt(aktivniPdv.id, 10));
    formData.append("datumIzdavanjaDokumenta", datumIzdavanjaDokumenta);
    formData.append("datumKreiranjaKalkulacije", datumKreiranjaKalkulacije);
    formData.append("valutaId", parseInt(valutaId, 10));
    if (file) {
      formData.append("file", file);
    }

    dispatch(createDokument(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (vrstaDokumentaId) {
      case "1":
        handleSubmitVrsta1();
        break;
      default:
        console.error("Nepoznata vrsta dokumenta");
    }
  };

  const handleOdabraniArtiklChange = (e) => {
    const artiklId = e.target.value;
    const selectedArtikl = artikliList.find(
      (artikl) => artikl.id === parseInt(artiklId, 10)
    );
    if (selectedArtikl) {
      setOdabraniArtikl({
        ...selectedArtikl,
        kolicina: 0, // Resetiramo količinu prilikom odabira novog artikla
        cijena: selectedArtikl.ArtikliCijene[0]?.cijena || 0,
        mpcijena: selectedArtikl.ArtikliCijene[0]?.mpcijena || 0,
      });
    }
  };

  useEffect(() => {
    if (odabraniArtikl && !editMode) {
      // Nađi zadnju cijenu iz liste cijena
      const zadnjaCijena =
        odabraniArtikl.ArtikliCijene.slice(-1)[0]?.cijena || 0;
      const zadnjaMPCijena =
        odabraniArtikl.ArtikliCijene.slice(-1)[0]?.mpcijena || 0;
      setCijena(zadnjaCijena);
      setMpCijena(zadnjaMPCijena);
    }
  }, [odabraniArtikl, editMode]);

  const handleGeneratePDF = () => {
    const content = contentRef.current;

    // Uklonite sve što ne želite u PDF-u
    document
      .querySelectorAll("header, footer")
      .forEach((el) => (el.style.display = "none"));

    const opt = {
      margin: [10, 10, 10, 10],
      filename: "dokument.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true, logging: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf()
      .from(content)
      .set(opt)
      .save()
      .then(() => {});
  };

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    pageStyle: `
        @page {
            size: A4 landscape;
            counter-increment: page;
        }
        body {
            -webkit-print-color-adjust: exact; 
            margin: 0; 
            overflow: hidden; 
        }
        header, footer {
            display: none; 
        }
        .printable-area {
            width: 100%; 
            height: auto; 
            box-sizing: border-box; 
        }
    `,
  });

  const handleToggleContent = () => {
    setIsContentVisible((prevState) => !prevState); // Prebaci prikaz sadržaja
  };

  return (
    <div className='min-h-screen '>
      <form onSubmit={handleSubmit} className=''>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-medium mb-2'>
            Vrsta Dokumenta
          </label>
          <select
            value={vrstaDokumentaId}
            onChange={(e) => setVrstaDokumentaId(e.target.value)}
            className='w-80 p-2 border border-gray-300 rounded-sm'
            required
          >
            <option value=''>Odaberite vrstu dokumenta</option>
            {vrstaDokumenta.map((vrsta) => (
              <option key={vrsta.id} value={vrsta.id}>
                {vrsta.naziv}
              </option>
            ))}
          </select>
        </div>
        {vrstaDokumentaId == 1 && (
          <>
            <UlaznaKalkulacija
              naziv={naziv}
              setNaziv={setNaziv}
              redniBroj={redniBroj}
              setRedniBroj={setRedniBroj}
              poslovniceId={poslovniceId}
              setPoslovnicaId={setPoslovnicaId}
              skladisteId={skladisteId}
              setSkladisteId={setSkladisteId}
              dobavljacId={dobavljacId}
              setDobavljacId={setDobavljacId}
              poslovnice={poslovnice}
              filteredSkladista={filteredSkladista}
              kupciDobavljaci={kupciDobavljaci}
              artikliList={artikliList}
              odabraniArtikl={odabraniArtikl}
              setOdabraniArtikl={setOdabraniArtikl}
              handleOdabraniArtiklChange={handleOdabraniArtiklChange}
              kolicina={kolicina}
              setKolicina={setKolicina}
              cijena={cijena}
              setCijena={setCijena}
              mpcijena={mpcijena}
              setMpCijena={setMpCijena}
              artikli={artikli}
              setArtikli={setArtikli}
              isContentVisible={isContentVisible}
              contentRef={contentRef}
              aktivniPdv={aktivniPdv}
              datumIzdavanjaDokumenta={datumIzdavanjaDokumenta}
              setDatumIzdavanjaDokumenta={setDatumIzdavanjaDokumenta}
              datumKreiranjaKalkulacije={datumKreiranjaKalkulacije}
              setDatumKreiranjaKalkulacije={setDatumKreiranjaKalkulacije}
              valutaId={valutaId}
              setValutaId={setValutaId}
              valute={valute}
              handleGeneratePDF={handleGeneratePDF}
              handlePrint={handlePrint}
              handleToggleContent={handleToggleContent}
              isDrawerOpen={isDrawerOpen}
              closeDrawer={closeDrawer}
              drawerContent={drawerContent}
              openDrawer={openDrawer}
              handleFileChange={handleFileChange}
            />
          </>
        )}
      </form>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        {drawerContent === "artikli" && <ArtikliForm />}
        {drawerContent === "dobavljaci" && <KupciDobavljaciForm />}
      </Drawer>
    </div>
  );
};
