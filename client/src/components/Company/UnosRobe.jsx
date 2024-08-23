import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {createDokument} from "../../features/dokumenti/dokumentThunks.js";
import { useParams } from "react-router-dom";

export const UnosRobe = () => {
    const dispatch = useDispatch()
    const [naziv, setNaziv] = useState("");
    const [redniBroj, setRedniBroj] = useState(0);

    const { companyId } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createDokument({ naziv, redniBroj, companyId }));
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

            <button
                type='submit'
                className={`w-full p-2 text-black border-2 rounded `}

            >
               Create
            </button>
        </form>
    )
}