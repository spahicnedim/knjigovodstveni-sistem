import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {createDokument} from "../../features/dokumenti/dokumentThunks.js";
import { useParams } from "react-router-dom";
import {fetchSkladista} from "../../features/skladista/skladisteThunks.js";
import {fetchPoslovnice} from "../../features/poslovnice/poslovnicaThunks.js";
import {fetchVrstaDokumenta} from "../../features/vrstaDokumenta/vrstaDokumentaThunks.js";


export const UnosRobe = () => {
    const dispatch = useDispatch()
    const [naziv, setNaziv] = useState("");
    const [redniBroj, setRedniBroj] = useState(0);
    const [poslovniceId, setPoslovnicaId] = useState(null);
    const [skladisteId, setSkladisteId] = useState(null);
    const [filteredSkladista, setFilteredSkladista] = useState([]);
    const [vrstaDokumentaId, setVrstaDokumentaId] = useState(null);
    const [artikli, setArtikli] = useState([]); // Lista artikala za dokument
    const [noviArtikl, setNoviArtikl] = useState({
        naziv: "",
        sifra: "",
        jedinicaMjere: "",
        kolicina: 0,
        cijena: 0,
    });


    const poslovnice = useSelector((state) => state.poslovnica.poslovnice);
    const skladista = useSelector((state) => state.skladiste.skladista);
    const vrstaDokumenta = useSelector((state) => state.vrstaDokumenta.vrsteDokumenata);

    const { companyId } = useParams();

    useEffect(() => {
        dispatch(fetchPoslovnice());
        dispatch(fetchSkladista());
        dispatch(fetchVrstaDokumenta())
    }, [dispatch]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createDokument({
            naziv,
            redniBroj: parseInt(redniBroj, 10),
            poslovniceId: parseInt(poslovniceId, 10),
            skladisteId: parseInt(skladisteId, 10),
            vrstaDokumentaId: parseInt(vrstaDokumentaId, 10),
            artikli, // Prosljeđujemo listu artikala zajedno s podacima dokumenta
            companyId
        }));
    };


    const handleArtiklChange = (e) => {
        const { name, value } = e.target;
        setNoviArtikl({
            ...noviArtikl,
            [name]: value,
        });
    };

    const handleAddArtikl = () => {
        setArtikli([...artikli, noviArtikl]);
        setNoviArtikl({
            naziv: "",
            sifra: "",
            jedinicaMjere: "",
            kolicina: 0,
            cijena: 0,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto'
        >
            <h2 className='text-2xl font-bold mb-4'>Create Dokument</h2>


            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Naziv
                </label>
                <input
                    type='text'
                    value={naziv}
                    onChange={(e) => setNaziv(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    placeholder='Enter naziv'
                    required
                />
            </div>

            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Redni broj
                </label>
                <input
                    type='text'
                    value={redniBroj}
                    onChange={(e) => setRedniBroj(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    placeholder='Enter Postanski Broj'
                    required
                />
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Vrsta Dokumenta
                </label>
                <select
                    value={vrstaDokumentaId}
                    onChange={(e) => setVrstaDokumentaId(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    required
                >
                    <option value="">Odaberite dokument</option>
                    {vrstaDokumenta.map((vrstaDokumenta) => (
                        <option key={vrstaDokumenta.id} value={vrstaDokumenta.id}>
                            {vrstaDokumenta.naziv}
                        </option>
                    ))}
                </select>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Poslovnica
                </label>
                <select
                    value={poslovniceId}
                    onChange={(e) => setPoslovnicaId(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    required
                >
                    <option value="">Odaberite poslovnicu</option>
                    {poslovnice.map((poslovnica) => (
                        <option key={poslovnica.id} value={poslovnica.id}>
                            {poslovnica.naziv}
                        </option>
                    ))}
                </select>
            </div>

            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Skladište
                </label>
                <select
                    value={skladisteId}
                    onChange={(e) => setSkladisteId(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    required
                >
                    <option value="">Odaberite skladište</option>
                    {filteredSkladista.map((skladiste) => (
                        <option key={skladiste.id} value={skladiste.id}>
                            {skladiste.naziv}
                        </option>
                    ))}
                </select>
            </div>

            <div className='mb-4'>
                <h3 className='text-xl font-bold mb-2'>Dodaj Artikl</h3>
                <input
                    type='text'
                    name='naziv'
                    value={noviArtikl.naziv}
                    onChange={handleArtiklChange}
                    className='w-full p-2 border border-gray-300 rounded mb-2'
                    placeholder='Naziv artikla'
                />
                <input
                    type='text'
                    name='sifra'
                    value={noviArtikl.sifra}
                    onChange={handleArtiklChange}
                    className='w-full p-2 border border-gray-300 rounded mb-2'
                    placeholder='Šifra artikla'
                />
                <input
                    type='text'
                    name='jedinicaMjere'
                    value={noviArtikl.jedinicaMjere}
                    onChange={handleArtiklChange}
                    className='w-full p-2 border border-gray-300 rounded mb-2'
                    placeholder='Jedinica mjere'
                />
                <input
                    type='number'
                    name='kolicina'
                    value={noviArtikl.kolicina}
                    onChange={handleArtiklChange}
                    className='w-full p-2 border border-gray-300 rounded mb-2'
                    placeholder='Količina'
                />
                <input
                    type='number'
                    name='cijena'
                    value={noviArtikl.cijena}
                    onChange={handleArtiklChange}
                    className='w-full p-2 border border-gray-300 rounded mb-2'
                    placeholder='Cijena'
                />
                <button type='button' onClick={handleAddArtikl} className='w-full p-2 bg-blue-500 text-white rounded'>
                    Dodaj Artikl
                </button>
            </div>

            {/* Prikaz unesenih artikala */}
            {artikli.length > 0 && (
                <div className='mb-4'>
                    <h3 className='text-xl font-bold mb-2'>Uneseni Artikli</h3>
                    {artikli.map((artikl, index) => (
                        <div key={index} className='border-b border-gray-300 py-2'>
                            {artikl.naziv} - {artikl.kolicina} {artikl.jedinicaMjere}
                        </div>
                    ))}
                </div>
            )}

            <button type='submit' className='w-full p-2 text-black border-2 rounded'>
                Create
            </button>
        </form>
    );
};