import { ArtikliForm } from "../Forme/ArtikliForm.jsx";
import Drawer from "../../Drawer.jsx";
import PdfContent from "../PDFLayout/PDFDokument.jsx";
import { roundTo } from "../../../utils/RoundTo.jsx";
import Select from "react-select";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import SelectArtikli from "../SelectSearch/SelectArtikli.jsx";
import SelectDobavljaci from "../SelectSearch/SelectDobavljaci.jsx";
import SelectSkladista from "../SelectSearch/SelectSkladista.jsx";
import SelectPoslovnice from "../SelectSearch/SelectPoslovnice.jsx";
import SelectValuta from "../SelectSearch/SelectValuta.jsx";

const UlaznaKalkulacija = ({
  naziv,
  setNaziv,
  redniBroj,
  setRedniBroj,
  poslovniceId,
  setPoslovnicaId,
  skladisteId,
  setSkladisteId,
  dobavljacId,
  setDobavljacId,
  poslovnice,
  filteredSkladista,
  kupciDobavljaci,
  artikliList,
  odabraniArtikl,
  setOdabraniArtikl,
  handleOdabraniArtiklChange,
  kolicina,
  setKolicina,
  cijena,
  setCijena,
  mpcijena,
  setMpCijena,
  handleAddArtikl,
  artikli,
  isContentVisible,
  contentRef,
  aktivniPdv,
  datumIzdavanjaDokumenta,
  setDatumIzdavanjaDokumenta,
  datumKreiranjaKalkulacije,
  setDatumKreiranjaKalkulacije,
  valutaId,
  setValutaId,
  valute,
  handleGeneratePDF,
  handlePrint,
  handleToggleContent,
  isDrawerOpen,
  closeDrawer,
  drawerContent,
  openDrawer,
  handleFileChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const artikliOptions = artikliList.map((artikl) => ({
      value: artikl.id,
      label: artikl.naziv,
    }));

    // Dodaj opciju "Create" ako unos ne postoji u opcijama
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


  return (
      <div className='p-6 bg-white rounded-lg shadow-md space-y-6'>
        <div className='flex items-center  space-x-5 mb-6'>
          <label className='block text-gray-700 text-sm font-medium'>Naziv</label>
          <input
              type='text'
              value={naziv}
              onChange={(e) => setNaziv(e.target.value)}
              className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
              placeholder='Unesite naziv'
              required
          />
        </div>

        <div className='flex items-center space-x-5 mb-6'>
          <label className='block text-gray-700 text-sm font-medium'>
            Broj dokumenta
          </label>
          <input
              type='number'
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
              Datum izdavanja dokumenta
            </label>
            <div className='relative'>
              <DatePicker
                  selected={datumIzdavanjaDokumenta}
                  onChange={(date) => setDatumIzdavanjaDokumenta(date)}
                  dateFormat='dd/MM/yyyy'
                  placeholderText='Odaberi datum'
                  className='w-72 h-9 p-2 pl-10 border border-gray-300 rounded-sm bg-white'
              />
              <FaCalendarAlt className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500'/>
            </div>
          </div>

          <div className='flex items-center space-x-5'>
            <label className='block text-gray-700 text-sm font-medium'>
              Datum kreiranja kalkulacije
            </label>
            <div className='relative'>
              <DatePicker
                  selected={datumKreiranjaKalkulacije}
                  onChange={(date) => setDatumKreiranjaKalkulacije(date)}
                  dateFormat='dd/MM/yyyy'
                  placeholderText='Odaberi datum'
                  className='w-72 h-9 p-2 pl-10 border border-gray-300 rounded-sm bg-white'
              />
              <FaCalendarAlt className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500'/>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-32  mb-6'>
          <div className='flex items-center space-x-5'>
            <label className='block text-gray-700 text-sm font-medium'>
              Poslovnica
            </label>
            {/*<select*/}
            {/*    value={poslovniceId}*/}
            {/*    onChange={(e) => setPoslovnicaId(e.target.value)}*/}
            {/*    className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'*/}
            {/*    required*/}
            {/*>*/}
            {/*  <option value=''>Odaberite poslovnicu</option>*/}
            {/*  {poslovnice.map((poslovnica) => (*/}
            {/*      <option key={poslovnica.id} value={poslovnica.id}>*/}
            {/*        {poslovnica.naziv}*/}
            {/*      </option>*/}
            {/*  ))}*/}
            {/*</select>*/}
            <SelectPoslovnice
                poslovnice={poslovnice}
                setPoslovnicaId={setPoslovnicaId}
                openDrawer={openDrawer}
            />
          </div>
          <div className='flex items-center space-x-5'>
            <label className='block text-gray-700 text-sm font-medium'>
              Skladište
            </label>
            {/*<select*/}
            {/*    value={skladisteId}*/}
            {/*    onChange={(e) => setSkladisteId(e.target.value)}*/}
            {/*    className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'*/}
            {/*    required*/}
            {/*>*/}
            {/*  <option value=''>Odaberite skladište</option>*/}
            {/*  {filteredSkladista.map((skladiste) => (*/}
            {/*      <option key={skladiste.id} value={skladiste.id}>*/}
            {/*        {skladiste.naziv}*/}
            {/*      </option>*/}
            {/*  ))*/}
            {/*</select>*/}
            <SelectSkladista
                filteredSkladista={filteredSkladista}
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
                setDobavljacId={setDobavljacId}
                placeholder='Odaberite dobavljaca'
                className='w-80 h-9 p-2 rounded-sm mb-3.5'
            />
          </div>
          <div className='flex items-center space-x-5'>
            <label className='block text-gray-700 text-sm font-medium'>
              Valuta
            </label>
            {/*<select*/}
            {/*    value={valutaId}*/}
            {/*    onChange={(e) => setValutaId(e.target.value)}*/}
            {/*    className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'*/}
            {/*    required*/}
            {/*>*/}
            {/*  <option value=''>Odaberite Valutu</option>*/}
            {/*  {valute.map((valuta) => (*/}
            {/*      <option key={valuta.id} value={valuta.id}>*/}
            {/*        {valuta.naziv}*/}
            {/*      </option>*/}
            {/*  ))}*/}
            {/*</select>*/}
            <SelectValuta
              valute={valute}
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
                required
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
                <button
                    type='button'
                    onClick={handleAddArtikl}
                    className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg'
                >
                  Dodaj
                </button>
              </div>
          )}
        </div>

        <div className='mb-6'>
          <h3 className='text-xl font-semibold mb-4'>Uneseni Artikli</h3>
          {artikli.length > 0 ? (
              <table className='w-full border-collapse border border-gray-300'>
                <thead>
                <tr>
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Redni broj
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
                  <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                    Maloprodajna cijena sa PDV-om
                  </th>
                  <th className='border border-gray-300 p-3 bg-gray-100 '></th>
                </tr>
                </thead>
                <tbody>
                {artikli.map((artikl, index) => (
                    <tr key={index}>
                      <td className='border border-gray-300 p-3'>{index + 1}</td>
                      <td className='border border-gray-300 p-3'>{artikl.naziv}</td>
                      <td className='border border-gray-300 p-3 text-right'>
                        {artikl.jedinicaMjere}
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
                        {roundTo((artikl.kolicina * artikl.mpcijena * 17) / 100, 2)}
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
                            // onClick={() => handleRemoveArtikl(index)}
                            className='text-red-500 hover:text-red-600'
                        >
                          Izbriši
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
  );
};

export default UlaznaKalkulacija;
