import { roundTo } from "../../../../utils/RoundTo.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import SelectArtikli from "../../SelectSearch/SelectArtikli.jsx";
import SelectSkladista from "../../SelectSearch/SelectSkladista.jsx";
import SelectPoslovnice from "../../SelectSearch/SelectPoslovnice.jsx";
import { setEditMode } from "../../../../features/editModeSlice.js";
import "react-photo-view/dist/react-photo-view.css";
import { useParams } from "react-router-dom";
import { fetchSkladista } from "../../../../features/skladista/skladisteThunks.js";
import { fetchPoslovnice } from "../../../../features/poslovnice/poslovnicaThunks.js";
import { fetchSkladisteArtikli} from "../../../../features/artikli/artikliThunks.js";
import { fetchPdv } from "../../../../features/dokumenti/dokumentThunks.js";
import HandleAddArtikliMaloprodaja from "../../Assets/HandleAddArtikliMaloprodaja.jsx";
import SelectSkladisteArtikli from "../../SelectSearch/SelectSkladisteArtikli.jsx";
import HandleAddArtiklNivelacija from "../../Assets/HandleAddArtikliNivelacija.jsx";


const NivelacijeForm = ({
                            redniBroj,
                            setRedniBroj,
                            poslovniceId,
                            setPoslovnicaId,
                            skladisteId,
                            setSkladisteId,
                            artikli,
                            setArtikli,
                            setAktivniPdv,
                            datumIzdavanjaDokumenta,
                            setDatumIzdavanjaDokumenta,
                        }) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [filteredSkladista, setFilteredSkladista] = useState([]);
    const [odabraniArtikl, setOdabraniArtikl] = useState(null); // Odabrani artikl iz dropdowna
    const [kolicina, setKolicina] = useState(0);
    const [cijena, setCijena] = useState(0);
    const [mpcijena, setMpCijena] = useState(null);
    const [novaCijena, setNovaCijena] = useState(""); // Nova cijena koju želimo postaviti

    const poslovnice = useSelector((state) => state.poslovnica.poslovnice) || [];
    const skladista = useSelector((state) => state.skladiste.skladista);

    const artikliList = useSelector((state) => state.artikl.artikli);
    const pdv = useSelector((state) => state.dokument.pdv);
    const editMode = useSelector((state) => state.editMode.editMode);

    const { companyId } = useParams();
    const openDrawer = (content) => {
        setDrawerContent(content);
        setIsDrawerOpen(true);
    };

    useEffect(() => {
        dispatch(fetchPoslovnice(companyId));
        dispatch(fetchSkladista());
        dispatch(fetchPdv());
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
        if (poslovniceId) {
            dispatch(fetchSkladisteArtikli(skladisteId));
        }
    }, [dispatch, skladisteId]);

    useEffect(() => {
        const aktivni = pdv.find((p) => p.Aktivan);
        setAktivniPdv(aktivni);
    }, [pdv]);

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
    useEffect(() => {
        if (odabraniArtikl && !editMode) {
            // Nađi zadnju cijenu iz liste cijena
            setCijena(odabraniArtikl.cijena.mpcijena);
            setKolicina(odabraniArtikl.kolicina)
        }
    }, [odabraniArtikl, editMode]);

    const handleRemoveArtikl = (index) => {
        const noviArtikli = artikli.filter((_, i) => i !== index);

        setArtikli(noviArtikli);
    };

    const handleEditArtikl = (index) => {
        const artikl = artikli[index];
        if (artikl) {
            setOdabraniArtikl({
                ...artikl.artikli,
                kolicina: artikl.kolicina,
                staraCijena: artikl.staraCijena,
                mpcijena: artikl.mpcijena,
            });

            setKolicina(artikl.kolicina);
            setCijena(artikl.staraCijena);
            setMpCijena(artikl.mpcijena);
            setNovaCijena(artikl.novaCijena || "");
            dispatch(setEditMode(true));
            setEditIndex(index);
        }
    };

    console.log(artikli)

    return (
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
                        <FaCalendarAlt className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500'/>
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

            <div className='border-t border-gray-300 my-4'></div>

            <div className='mb-6'>
                <h3 className='text-xl font-semibold mb-4'>Dodaj Artikl</h3>
                <div className='flex items-center space-x-4 mb-4'>
                    <SelectSkladisteArtikli
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
                                Cijena:
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
                                Nova cijena:
                            </label>
                            <input
                                type='number'
                                value={novaCijena}
                                onChange={(e) => setNovaCijena(e.target.value)}
                                placeholder='Nova cijena'
                                className='flex-1 h-9 p-2 border border-gray-300 rounded-sm'
                            />
                        </div>
                        <HandleAddArtiklNivelacija
                            odabraniArtikl={odabraniArtikl}
                            kolicina={kolicina}
                            cijena={cijena}
                            mpcijena={mpcijena}
                            novaCijena={novaCijena}
                            artikli={artikli}
                            setArtikli={setArtikli}
                            setOdabraniArtikl={setOdabraniArtikl}
                            setKolicina={setKolicina}
                            setCijena={setCijena}
                            setMpCijena={setMpCijena}
                            setNovaCijena={setNovaCijena}
                            editIndex={editIndex}
                            setEditIndex={setEditIndex}
                        />
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
                                Šifra
                            </th>
                            <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                                Naziv
                            </th>
                            <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                                Stanje
                            </th>
                            <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                                Stara cijena
                            </th>
                            <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                                Nova cijena
                            </th>
                            <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                                Efekat nivelacije
                            </th>
                            <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                                Porez
                            </th>
                            <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm '>
                                Marza
                            </th>
                            <th className='border border-gray-300 p-3 bg-gray-100 '></th>
                        </tr>
                        </thead>
                        <tbody>
                        {artikli.map((artikl, index) => (
                            <tr key={index}>
                                <td className='border border-gray-300 p-3'>{index + 1}</td>
                                <td className='border border-gray-300 p-3'>
                                    {artikl.artikli.sifra}
                                </td>
                                <td className='border border-gray-300 p-3'>
                                    {artikl.artikli.naziv}
                                </td>
                                <td className='border border-gray-300 p-3 text-right'>
                                    {artikl.kolicina}
                                </td>
                                <td className='border border-gray-300 p-3 text-right'>
                                    {roundTo(artikl.staraCijena, 2)}
                                </td>
                                <td className='border border-gray-300 p-3 text-right'>
                                    {roundTo(artikl.mpcijena, 2)}
                                </td>
                                <td className='border border-gray-300 p-3 text-right'>
                                    {artikl.popust || roundTo(0, 2)}%
                                </td>
                                <td className='border border-gray-300 p-3 text-right'>
                                    {roundTo(
                                        artikl.popust === null
                                            ? (artikl.cijena + (artikl.cijena * 17) / 100) // Ako je popust 0, računa cijenu sa PDV-om
                                            : (artikl.cijena - (artikl.cijena * artikl.popust) / 100) * 1.17, // Ako ima popusta, računa s popustom i PDV-om
                                        2
                                    )}
                                </td>
                                <td className='border border-gray-300 p-3 text-right'>
                                    {roundTo(
                                        artikl.popust === 0
                                            ? artikl.cijena * artikl.kolicina // Ako je popust 0, računa cijenu s PDV-om i množi s količinom
                                            : (artikl.cijena - (artikl.cijena * artikl.popust) / 100) * artikl.kolicina, // Ako ima popusta, računa cijenu s popustom, dodaje PDV i množi s količinom
                                        2
                                    )}
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


            <div className='flex justify-end space-x-4 mt-4'>
                <button
                    type='submit'
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Sačuvaj
                </button>
            </div>
        </div>
    );
};


export default NivelacijeForm;
