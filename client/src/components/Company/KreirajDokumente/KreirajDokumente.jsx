import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDokument } from "../../../features/dokumenti/dokumentThunks.js";
import { useParams } from "react-router-dom";
import { fetchVrstaDokumenta } from "../../../features/vrstaDokumenta/vrstaDokumentaThunks.js";
import MaloprodajnaKalkulacijaForm from "../VrsteDokumenata/MaloprodajnaKalkulacija/MaloprodajnaKalkulacijaForm.jsx";
import VeleprodajnaKalkulacijaForm from "../VrsteDokumenata/VeleprodajnaKalkulacija/VeleprodajnaKalkulacijaForm.jsx";


export const KreirajDokumente = () => {
  const dispatch = useDispatch();
  const [redniBroj, setRedniBroj] = useState(0);
  const [poslovniceId, setPoslovnicaId] = useState(null);
  const [skladisteId, setSkladisteId] = useState(null);
  const [vrstaDokumentaId, setVrstaDokumentaId] = useState(null);
  const [artikli, setArtikli] = useState([]);
  const [dobavljacId, setDobavljacId] = useState(null);
  const [aktivniPdv, setAktivniPdv] = useState(null);
  const [datumIzdavanjaDokumenta, setDatumIzdavanjaDokumenta] = useState("");
  const [datumKreiranjaKalkulacije, setDatumKreiranjaKalkulacije] =
    useState("");
  const [valutaId, setValutaId] = useState(null);
  const [file, setFile] = useState(null);

  const vrstaDokumenta = useSelector(
    (state) => state.vrstaDokumenta.vrsteDokumenata
  );

  const { companyId } = useParams();


  useEffect(() => {
    dispatch(fetchVrstaDokumenta());
  }, [dispatch, companyId]);


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
    </div>
  );
};
