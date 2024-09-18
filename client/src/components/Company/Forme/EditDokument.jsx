import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDokument,
  updateDokument,
} from "../../../features/dokumenti/dokumentThunks.js";
import { useParams } from "react-router-dom";
import { fetchSkladista } from "../../../features/skladista/skladisteThunks.js";
import { fetchPoslovnice } from "../../../features/poslovnice/poslovnicaThunks.js";
import { fetchVrstaDokumenta } from "../../../features/vrstaDokumenta/vrstaDokumentaThunks.js";
import { fetchArtikli } from "../../../features/artikli/artikliThunks.js";
import { fetchKupciDobavljaci } from "../../../features/kupacDobavljac/kupacDobavljacThunk.js";
import {
  fetchPdv,
  fetchDokumentiById,
} from "../../../features/dokumenti/dokumentThunks.js";
import { fetchValuta } from "../../../features/valute/valuteThunks.js";
import { roundTo } from "../../../utils/RoundTo.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import SelectArtikli from "../SelectSearch/SelectArtikli.jsx";
import SelectDobavljaci from "../SelectSearch/SelectDobavljaci.jsx";
import SelectSkladista from "../SelectSearch/SelectSkladista.jsx";
import SelectPoslovnice from "../SelectSearch/SelectPoslovnice.jsx";
import SelectValuta from "../SelectSearch/SelectValuta.jsx";
import HandleAddArtikl from "../Assets/HandleAddArtikli.jsx";
import { setEditMode } from "../../../features/editModeSlice.js";

export function EditDokument() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

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

  const poslovnice = useSelector((state) => state.poslovnica.poslovnice) || [];
  const skladista = useSelector((state) => state.skladiste.skladista);
  const vrstaDokumenta = useSelector(
    (state) => state.vrstaDokumenta.vrsteDokumenata
  );
  const artikliList = useSelector((state) => state.artikl.artikli);
  const kupciDobavljaci = useSelector(
    (state) => state.kupacDobavljac.kupciDobavljaci
  );
  const dokument = useSelector((state) => state.dokument.current);
  const pdv = useSelector((state) => state.dokument.pdv);
  const valute = useSelector((state) => state.valuta.valute);
  const editMode = useSelector((state) => state.editMode.editMode);

  const { companyId, dokumentId } = useParams();

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
    dispatch(fetchDokumentiById(dokumentId));
  }, [dispatch, companyId, dokumentId]);

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

  useEffect(() => {
    if (dokument && dokument.dokument) {
      setRedniBroj(dokument.dokument.redniBroj);
      setPoslovnicaId(dokument.dokument.poslovniceId);
      setSkladisteId(dokument.dokument.skladisteId);
      setVrstaDokumentaId(dokument.dokument.vrstaDokumentaId);
      setArtikli(dokument.dokument.DokumentiArtikli || []);
      setDobavljacId(dokument.dokument.kupacDobavljacId);
      setAktivniPdv(dokument.dokument.pDVId);
      setDatumIzdavanjaDokumenta(dokument.dokument.datumIzdavanjaDokumenta);
      setDatumKreiranjaKalkulacije(dokument.dokument.datumKreiranjaKalkulacije);
      setValutaId(dokument.dokument.valutaId);
      setFile(dokument.dokument.file);
    }
  }, [dokumentId, dokument]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", dokumentId);
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
    dispatch(updateDokument({ dokumentId, formData }));
    dispatch(fetchDokumentiById(dokumentId));
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

  useEffect(() => {
    const artikliOptions = artikliList.map((artikl) => ({
      value: artikl.id,
      label: artikl.naziv,
    }));

    if (
      inputValue &&
      !artikliOptions.some(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
      )
    ) {
      artikliOptions.push({
        label: `Create "${inputValue}"`,
        value: "create",
        isCreateOption: true,
      });
    }

    setOptions(artikliOptions);
  }, [inputValue, artikliList]);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption?.isCreateOption) {
      openDrawer("artikli");
    } else {
      setOdabraniArtikl(
        selectedOption
          ? artikliList.find((artikl) => artikl.id === selectedOption.value)
          : null
      );
    }
  };

  const handleRemoveArtikl = (index) => {
    const noviArtikli = artikli.filter((_, i) => i !== index);

    setArtikli(noviArtikli);
  };

  const handleEditArtikl = (index) => {
    const artikl = artikli[index];
    if (artikl) {
      setOdabraniArtikl({
        ...artikl.artikli, // Provjerite da li ovo odgovara strukturi vaših podataka
        kolicina: artikl.kolicina,
        cijena: artikl.cijena,
        mpcijena: artikl.mpcijena,
      });

      setKolicina(artikl.kolicina);
      setCijena(artikl.cijena);
      setMpCijena(artikl.mpcijena);
      dispatch(setEditMode(true));
      setEditIndex(index);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=''>
      <div className='p-6 bg-white rounded-lg shadow-md space-y-6'>
        <div className='flex items-center space-x-5 mb-6'>
          <label className='block text-gray-700 text-sm font-medium'>
            Broj dokumenta
          </label>
          <input
            type='text'
            value={redniBroj}
            onChange={(e) => setRedniBroj(e.target.value)}
            className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
            placeholder='Unesite broj dokumenta'
            required
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-32 mb-6'>
          <div className='flex items-center space-x-5'>
            <label className='block text-gray-700 text-sm font-medium'>
              Datum kalkulacije
            </label>
            <div className='relative'>
              <DatePicker
                selected={datumKreiranjaKalkulacije}
                onChange={(date) => setDatumKreiranjaKalkulacije(date)}
                dateFormat='dd.MM.yyyy'
                placeholderText='Odaberi datum'
                className='w-72 h-9 p-2 pl-10 border border-gray-300 rounded-sm bg-white'
              />
              <FaCalendarAlt className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500' />
            </div>
          </div>
          <div className='flex items-center space-x-5'>
            <label className='block text-gray-700 text-sm font-medium'>
              Datum prijema robe
            </label>
            <div className='relative'>
              <DatePicker
                selected={datumIzdavanjaDokumenta}
                onChange={(date) => setDatumIzdavanjaDokumenta(date)}
                dateFormat='dd.MM.yyyy'
                placeholderText='Odaberi datum'
                className='w-72 h-9 p-2 pl-10 border border-gray-300 rounded-sm bg-white'
              />
              <FaCalendarAlt className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500' />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-32  mb-6'>
          <div className='flex items-center space-x-5'>
            <label className='block text-gray-700 text-sm font-medium'>
              Poslovnica
            </label>
            <SelectPoslovnice
              poslovnice={poslovnice}
              poslovniceId={poslovniceId}
              setPoslovnicaId={setPoslovnicaId}
              openDrawer={openDrawer}
            />
          </div>
          <div className='flex items-center space-x-5'>
            <label className='block text-gray-700 text-sm font-medium'>
              Skladište
            </label>
            <SelectSkladista
              filteredSkladista={filteredSkladista}
              skladisteId={skladisteId}
              setSkladisteId={setSkladisteId}
              openDrawer={openDrawer}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-32 mb-6'>
          <div className='flex items-center space-x-5'>
            <label className='block text-gray-700 text-sm font-medium'>
              Dobavljač
            </label>
            <SelectDobavljaci
              kupciDobavljaci={kupciDobavljaci}
              openDrawer={openDrawer}
              dobavljacId={dobavljacId}
              setDobavljacId={setDobavljacId}
              placeholder='Odaberite dobavljaca'
              className='w-80 h-9 p-2 rounded-sm mb-3.5'
            />
          </div>
          <div className='flex items-center space-x-5'>
            <label className='block text-gray-700 text-sm font-medium'>
              Valuta
            </label>
            <SelectValuta
              valute={valute}
              valutaId={valutaId}
              setValutaId={setValutaId}
              openDrawer={openDrawer}
            />
          </div>
        </div>

        <div className='flex items-center space-x-5 mb-6'>
          <label className='block text-gray-700 text-sm font-medium'>
            Zakaci dokument
          </label>

          <div className='relative'>
            <input
              id='fileUpload'
              type='file'
              onChange={handleFileChange}
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
            />

            <button
              type='button'
              className='p-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 transition duration-300 ease-in-out'
            >
              Odaberi dokument
            </button>
          </div>
        </div>
        <div className='border-t border-gray-300 my-4'></div>

        <div className='mb-6'>
          <h3 className='text-xl font-semibold mb-4'>Dodaj Artikl</h3>
          <div className='flex items-center space-x-4 mb-4'>
            <SelectArtikli
              artikliList={artikliList}
              openDrawer={openDrawer}
              setOdabraniArtikl={setOdabraniArtikl}
              placeholder='Odaberite artikl ili unesite novi'
              className='w-80 h-9 p-2 rounded-sm mb-3.5'
            />
          </div>
          {odabraniArtikl && (
            <div className='flex flex-col md:flex-row gap-6 mb-4'>
              <div className='flex items-center space-x-5'>
                <label className='block text-gray-700 text-sm font-medium'>
                  Količina:
                </label>
                <input
                  type='number'
                  value={kolicina}
                  onChange={(e) => setKolicina(e.target.value)}
                  placeholder='Količina'
                  className='flex-1 h-9 p-2 border border-gray-300 rounded-sm'
                />
              </div>
              <div className='flex items-center space-x-5'>
                <label className='block text-gray-700 text-sm font-medium'>
                  Nabavna cijena:
                </label>
                <input
                  type='number'
                  value={cijena}
                  onChange={(e) => setCijena(e.target.value)}
                  placeholder='Cijena'
                  className='flex-1 h-9 p-2 border border-gray-300 rounded-sm'
                />
              </div>
              <div className='flex items-center space-x-5'>
                <label className='block text-gray-700 text-sm font-medium'>
                  Maloprodajna cijena:
                </label>
                <input
                  type='number'
                  value={mpcijena}
                  onChange={(e) => setMpCijena(e.target.value)}
                  placeholder='Maloprodajna cijena'
                  className='flex-1 h-9 p-2 border border-gray-300 rounded-sm'
                />
              </div>
              <HandleAddArtikl
                odabraniArtikl={odabraniArtikl}
                kolicina={kolicina}
                cijena={cijena}
                mpcijena={mpcijena}
                artikli={artikli}
                setArtikli={setArtikli}
                setOdabraniArtikl={setOdabraniArtikl}
                setKolicina={setKolicina}
                setCijena={setCijena}
                setMpCijena={setMpCijena}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
                dokumentId={dokumentId}
              />
            </div>
          )}
        </div>

        <div className='mb-6'>
          <h3 className='text-xl font-semibold mb-4'>Uneseni Artikli</h3>
          {artikli?.length > 0 ? (
            <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Redni broj
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Sifra
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Naziv
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Jedinica mjere
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Količina
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Fakturna cijena bez PDV-a
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Fakturna vrijednost bez PDV-a
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Zavisni troskovi bez PDV-a
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm '>
                    Nabavna cijena po jedinici mjere
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Nabavna vrijednost bez PDV-a
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Stopa razlike u cijeni
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Iznos razlike u cijeni
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Prodajna vrijednost proizvoda bez PDV-a
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Stopa PDV-a
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Iznos PDV-a
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Maloprodajna vrijednost sa PDV-om
                  </th>
                  <th className='border border-gray-300 bt p-3 bg-gray-100 font-normal text-sm'>
                    Maloprodajna cijena sa PDV-om
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 '></th>
                </tr>
              </thead>
              <tbody>
                {artikli.map((artikl, index) => (
                  <tr key={index}>
                    <td className='border border-gray-300 p-3'>{index + 1}</td>
                    <td className='border border-gray-300 p-3'>
                      {artikl.artikli?.sifra}
                    </td>
                    <td className='border border-gray-300 p-3'>
                      {artikl.artikli?.naziv}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {artikl.artikli?.jedinicaMjere}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(artikl.kolicina, 2)}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(artikl.cijena, 2)}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(artikl.kolicina * artikl.cijena, 2)}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(0, 2)}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(artikl.cijena, 2)}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(artikl.kolicina * artikl.cijena, 2)}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(
                        ((artikl.kolicina * artikl.mpcijena -
                          artikl.kolicina * artikl.cijena) /
                          (artikl.kolicina * artikl.mpcijena)) *
                          100,
                        2
                      )}
                      %
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(
                        artikl.kolicina * artikl.mpcijena -
                          artikl.kolicina * artikl.cijena,
                        2
                      )}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(
                        artikl.kolicina * artikl.mpcijena -
                          (artikl.kolicina * artikl.mpcijena * 17) / 100,
                        2
                      )}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(aktivniPdv.stopaPDV, 2)}%
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(
                        (artikl.kolicina * artikl.mpcijena * 17) / 100,
                        2
                      )}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(artikl.kolicina * artikl.mpcijena, 2)}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      {roundTo(artikl.mpcijena, 2)}
                    </td>
                    <td className='border border-gray-300 p-3 text-right'>
                      <button
                        type='button'
                        onClick={() => handleRemoveArtikl(index)}
                        className='text-red-500 hover:text-red-600'
                      >
                        Izbriši
                      </button>
                      <button
                        type='button'
                        onClick={() => handleEditArtikl(index)}
                        className='text-blue-500 hover:text-blue-600'
                      >
                        Uredi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className='text-gray-500'>Nemate unesenih artikala.</p>
          )}
        </div>
        <div className='flex justify-end'>
          <div className='mt-4 p-5 flex gap-4 w-1/3 h-32 bg-gray-50 drop-shadow-md flex-col'>
            <div className='flex justify-between'>
              <h4 className='text-lg font-semibold'>Iznos racuna:</h4>
              <p className='text-xl'>
                {roundTo(
                  artikli?.reduce(
                    (acc, artikl) => acc + artikl.cijena * artikl.kolicina,
                    0
                  ),
                  2
                )}
                KM
              </p>
            </div>
            <div className='flex justify-between'>
              <h4 className='text-lg font-semibold'>Iznos racuna sa PDV-om:</h4>
              <p className='text-xl'>
                {roundTo(
                  artikli?.reduce(
                    (acc, artikl) => acc + artikl.mpcijena * artikl.kolicina,
                    0
                  ),
                  2
                )}
                KM
              </p>
            </div>
            <div className='border-t border-gray-400'></div>
          </div>
        </div>

        <div className='flex justify-end space-x-4'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg'
          >
            Sačuvaj
          </button>
        </div>
        {/*{isContentVisible && (*/}
        {/*    <div className="mt-4">*/}
        {/*        <PdfContent ref={contentRef} artikli={artikli} aktivniPdv={aktivniPdv} roundTo={roundTo}*/}
        {/*                    naziv={naziv}*/}
        {/*                    brojDokumenta={redniBroj}*/}
        {/*                    dobavljac={kupciDobavljaci.find((dobavljac) => dobavljac.id == dobavljacId)?.name}/>*/}
        {/*    </div>*/}
        {/*)}*/}

        {/*<button*/}
        {/*    type="button"*/}
        {/*    onClick={handleGeneratePDF}*/}
        {/*    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">Generiši*/}
        {/*    PDF*/}
        {/*</button>*/}
        {/*<button*/}
        {/*    type="button"*/}
        {/*    onClick={handlePrint}*/}
        {/*    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">Pregledaj*/}
        {/*    PDF*/}
        {/*</button>*/}
        {/*<button*/}
        {/*    type="button"*/}
        {/*    onClick={handleToggleContent}*/}
        {/*    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"*/}
        {/*>*/}
        {/*    {isContentVisible ? 'Hide PDF Content' : 'Show PDF Content'}*/}
        {/*</button>*/}
      </div>
    </form>
  );
}
