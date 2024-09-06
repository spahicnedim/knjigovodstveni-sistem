import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {createSkladiste} from "../../features/skladista/skladisteThunks.js";
import { useParams } from "react-router-dom";
import {fetchPoslovnice} from "../../features/poslovnice/poslovnicaThunks.js";
import {fetchvrstaSkladista} from "../../features/vrstaSkladista/vrstaSkladistaThunks.js";

export const Skladiste = () => {
    const dispatch = useDispatch()
    const [naziv, setNaziv] = useState("");
    const [sifra, setSifra] = useState("");
    const [poslovnicaId, setPoslovnicaId] = useState(null);
    const [vrstaSkladistaId, setVrstaSkladistaId] = useState(null);

    const { companyId } = useParams();

    const poslovnice = useSelector((state) => state.poslovnica.poslovnice);
    const vrstaSkladista = useSelector((state) => state.vrstaSkladista.vrsteSkladista);

    useEffect(() => {
        dispatch(fetchPoslovnice(companyId));
        dispatch(fetchvrstaSkladista())
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createSkladiste({ naziv, sifra, poslovnicaId, vrstaSkladistaId, companyId }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto'
        >
            <h2 className='text-2xl font-bold mb-4'>Kreiraj Skladište</h2>

            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Naziv
                </label>
                <input
                    type='text'
                    value={naziv}
                    onChange={(e) => setNaziv(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    placeholder='Unesite naziv'
                    required
                />
            </div>

            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Šifra
                </label>
                <input
                    type='text'
                    value={sifra}
                    onChange={(e) => setSifra(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    placeholder='Unesite šifru'
                    required
                />
            </div>

            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Poslovnica
                </label>
                <select
                    value={poslovnicaId}
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
                    Vrsta Skladista
                </label>
                <select
                    value={vrstaSkladistaId}
                    onChange={(e) => setVrstaSkladistaId(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    required
                >
                 <option value="">Odaberite vrstu skladista</option>
                    {vrstaSkladista.map((vrstaSkladista) => (
                        <option key={vrstaSkladista.id} value={vrstaSkladista.id}>
                            {vrstaSkladista.naziv}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type='submit'
                className='w-full p-2 text-black border-2 rounded'
            >
                Kreiraj
            </button>
        </form>
    );
}