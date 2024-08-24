import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {createDokument} from "../../features/dokumenti/dokumentThunks.js";
import { useParams } from "react-router-dom";
import {fetchSkladista} from "../../features/skladista/skladisteThunks.js";
import {fetchPoslovnice} from "../../features/poslovnice/poslovnicaThunks.js";

export const UnosRobe = () => {
    const dispatch = useDispatch()
    const [naziv, setNaziv] = useState("");
    const [redniBroj, setRedniBroj] = useState(0);
    const [poslovniceId, setPoslovnicaId] = useState(null);
    const [skladisteId, setSkladisteId] = useState(null);
    const [filteredSkladista, setFilteredSkladista] = useState([]);


    const poslovnice = useSelector((state) => state.poslovnica.poslovnice);
    const skladista = useSelector((state) => state.skladiste.skladista);

    const { companyId } = useParams();

    useEffect(() => {
        dispatch(fetchPoslovnice());
        dispatch(fetchSkladista())
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
        dispatch(createDokument({ naziv, redniBroj, poslovniceId, skladisteId,  companyId }));
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
            <button
                type='submit'
                className={`w-full p-2 text-black border-2 rounded `}

            >
                Create
            </button>
        </form>
    )
}