import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDokument } from "../../../features/dokumenti/dokumentThunks.js";
import { useParams } from "react-router-dom";
import { fetchVrstaDokumenta } from "../../../features/vrstaDokumenta/vrstaDokumentaThunks.js";
// import { fetchSkladista } from "../../../features/skladista/skladisteThunks.js";
// import { fetchPoslovnice } from "../../../features/poslovnice/poslovnicaThunks.js";
// import { fetchVrstaDokumenta } from "../../../features/vrstaDokumenta/vrstaDokumentaThunks.js";
// import { fetchArtikli } from "../../../features/artikli/artikliThunks.js";
// import { fetchKupciDobavljaci } from "../../../features/kupacDobavljac/kupacDobavljacThunk.js";
// import { fetchPdv } from "../../../features/dokumenti/dokumentThunks.js";
// import { fetchValuta } from "../../../features/valute/valuteThunks.js";
// import html2pdf from "html2pdf.js";
// import { useReactToPrint } from "react-to-print";
import MaloprodajnaKalkulacijaForm from "../VrsteDokumenata/MaloprodajnaKalkulacija/MaloprodajnaKalkulacijaForm.jsx";
import VeleprodajnaKalkulacijaForm from "../VrsteDokumenata/VeleprodajnaKalkulacija/VeleprodajnaKalkulacijaForm.jsx";
// import { ArtikliForm } from "../Forme/ArtikliForm.jsx";
// import Drawer from "../../Drawer.jsx";
// import KupciDobavljaciForm from "../Forme/KupciDobavljaci.jsx";

export const KreirajDokumente = () => {
  // const contentRef = useRef();
  const dispatch = useDispatch();
  const [redniBroj, setRedniBroj] = useState(0);
  const [poslovniceId, setPoslovnicaId] = useState(null);
  const [skladisteId, setSkladisteId] = useState(null);
  // const [filteredSkladista, setFilteredSkladista] = useState([]);
  const [vrstaDokumentaId, setVrstaDokumentaId] = useState(null);
  const [artikli, setArtikli] = useState([]); // Lista artikala za dokument
  // const [odabraniArtikl, setOdabraniArtikl] = useState(null); // Odabrani artikl iz dropdowna
  // const [kolicina, setKolicina] = useState(0);
  // const [cijena, setCijena] = useState(0);
  // const [mpcijena, setMpCijena] = useState(0);
  const [dobavljacId, setDobavljacId] = useState(null);
  const [aktivniPdv, setAktivniPdv] = useState(null);
  const [datumIzdavanjaDokumenta, setDatumIzdavanjaDokumenta] = useState("");
  const [datumKreiranjaKalkulacije, setDatumKreiranjaKalkulacije] =
    useState("");
  const [valutaId, setValutaId] = useState(null);
  const [file, setFile] = useState(null);
  //
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [drawerContent, setDrawerContent] = useState("");
  // const [isContentVisible, setIsContentVisible] = useState(false);
  //
  // const poslovnice = useSelector((state) => state.poslovnica.poslovnice) || [];
  // const skladista = useSelector((state) => state.skladiste.skladista);
  const vrstaDokumenta = useSelector(
    (state) => state.vrstaDokumenta.vrsteDokumenata
  );
  // const artikliList = useSelector((state) => state.artikl.artikli);
  // const kupciDobavljaci = useSelector(
  //   (state) => state.kupacDobavljac.kupciDobavljaci
  // );
  // const pdv = useSelector((state) => state.dokument.pdv);
  // const valute = useSelector((state) => state.valuta.valute);
  // const editMode = useSelector((state) => state.editMode.editMode);
  //
  const { companyId } = useParams();

  // const openDrawer = (content) => {
  //   setDrawerContent(content);
  //   setIsDrawerOpen(true);
  // };
  //
  // const closeDrawer = () => {
  //   setIsDrawerOpen(false);
  //   setDrawerContent("");
  // };
  //
  useEffect(() => {
    dispatch(fetchVrstaDokumenta());
  }, [dispatch, companyId]);
  //
  // useEffect(() => {
  //   // Filtriranje skladišta na osnovu odabrane poslovnice
  //   if (poslovniceId) {
  //     const relevantSkladista = skladista.filter(
  //       (skladiste) => skladiste.poslovnicaId === Number(poslovniceId)
  //     );
  //     setFilteredSkladista(relevantSkladista);
  //   } else {
  //     setFilteredSkladista([]);
  //   }
  // }, [poslovniceId, skladista]);
  //
  // useEffect(() => {
  //   const aktivni = pdv.find((p) => p.Aktivan);
  //   setAktivniPdv(aktivni);
  // }, [pdv]);
  //
  // // Funkcija za rukovanje promjenom fajla
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const handleSubmitMaloprodajnaKalkulacija = () => {
    const formData = new FormData();
    formData.append("redniBroj", redniBroj);
    formData.append("poslovniceId", parseInt(poslovniceId, 10));
    formData.append("skladisteId", parseInt(skladisteId, 10));
    formData.append("vrstaDokumentaId", parseInt(vrstaDokumentaId, 10));
    formData.append("artikli", JSON.stringify(artikli));
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

  const handleSubmitVeleprodajnaKalkulacija = () => {
    const formData = new FormData();
    formData.append("redniBroj", redniBroj);
    formData.append("poslovniceId", parseInt(poslovniceId, 10));
    formData.append("skladisteId", parseInt(skladisteId, 10));
    formData.append("vrstaDokumentaId", parseInt(vrstaDokumentaId, 10));
    formData.append("artikli", JSON.stringify(artikli));
    formData.append("companyId", companyId);
    formData.append("kupacDobavljacId", parseInt(dobavljacId, 10));
    formData.append("datumIzdavanjaDokumenta", datumIzdavanjaDokumenta);
    formData.append("datumKreiranjaKalkulacije", datumKreiranjaKalkulacije);
    formData.append("valutaId", parseInt(valutaId, 10));
    if (file) {
      formData.append("file", file);
    }

    dispatch(createDokument(formData));
  };



  // const handleOdabraniArtiklChange = (e) => {
  //   const artiklId = e.target.value;
  //   const selectedArtikl = artikliList.find(
  //     (artikl) => artikl.id === parseInt(artiklId, 10)
  //   );
  //   if (selectedArtikl) {
  //     setOdabraniArtikl({
  //       ...selectedArtikl,
  //       kolicina: 0, // Resetiramo količinu prilikom odabira novog artikla
  //       cijena: selectedArtikl.ArtikliCijene[0]?.cijena || 0,
  //       mpcijena: selectedArtikl.ArtikliCijene[0]?.mpcijena || 0,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (odabraniArtikl && !editMode) {
  //     // Nađi zadnju cijenu iz liste cijena
  //     const zadnjaCijena =
  //       odabraniArtikl.ArtikliCijene.slice(-1)[0]?.cijena || 0;
  //     const zadnjaMPCijena =
  //       odabraniArtikl.ArtikliCijene.slice(-1)[0]?.mpcijena || 0;
  //     setCijena(zadnjaCijena);
  //     setMpCijena(zadnjaMPCijena);
  //   }
  // }, [odabraniArtikl, editMode]);
  //

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (vrstaDokumentaId) {
      case "1":
        handleSubmitMaloprodajnaKalkulacija();
        break;
      case "2":
        handleSubmitVeleprodajnaKalkulacija();
        break;
      default:
        console.error("Nepoznata vrsta dokumenta");
    }
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

            <MaloprodajnaKalkulacijaForm
              redniBroj={redniBroj}
              setRedniBroj={setRedniBroj}
              poslovniceId={poslovniceId}
              setPoslovnicaId={setPoslovnicaId}
              skladisteId={skladisteId}
              setSkladisteId={setSkladisteId}
              vrstaDokumentaId={vrstaDokumentaId}
              artikli={artikli}
              setArtikli={setArtikli}
              dobavljacId={dobavljacId}
              setDobavljacId={setDobavljacId}
              aktivniPdv={aktivniPdv}
              setAktivniPdv={setAktivniPdv}
              datumIzdavanjaDokumenta={datumIzdavanjaDokumenta}
              setDatumIzdavanjaDokumenta={setDatumIzdavanjaDokumenta}
              datumKreiranjaKalkulacije={datumKreiranjaKalkulacije}
              setDatumKreiranjaKalkulacije={setDatumKreiranjaKalkulacije}
              valutaId={valutaId}
              setValutaId={setValutaId}
              file={file}
              setFile={setFile}
            />

        )}

        {vrstaDokumentaId == 2 && (
            <VeleprodajnaKalkulacijaForm
                redniBroj={redniBroj}
                setRedniBroj={setRedniBroj}
                poslovniceId={poslovniceId}
                setPoslovnicaId={setPoslovnicaId}
                skladisteId={skladisteId}
                setSkladisteId={setSkladisteId}
                vrstaDokumentaId={vrstaDokumentaId}
                artikli={artikli}
                setArtikli={setArtikli}
                dobavljacId={dobavljacId}
                setDobavljacId={setDobavljacId}
                // aktivniPdv={aktivniPdv}
                // setAktivniPdv={setAktivniPdv}
                datumIzdavanjaDokumenta={datumIzdavanjaDokumenta}
                setDatumIzdavanjaDokumenta={setDatumIzdavanjaDokumenta}
                datumKreiranjaKalkulacije={datumKreiranjaKalkulacije}
                setDatumKreiranjaKalkulacije={setDatumKreiranjaKalkulacije}
                valutaId={valutaId}
                setValutaId={setValutaId}
                file={file}
                setFile={setFile}
            />
        )}
      </form>

      {/*<Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>*/}
      {/*  {drawerContent === "artikli" && <ArtikliForm />}*/}
      {/*  {drawerContent === "dobavljaci" && <KupciDobavljaciForm />}*/}
      {/*</Drawer>*/}
    </div>
  );
};
