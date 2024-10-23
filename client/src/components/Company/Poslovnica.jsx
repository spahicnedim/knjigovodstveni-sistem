import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {createPoslovnica} from "../../features/poslovnice/poslovnicaThunks.js";
import { useParams } from "react-router-dom";
import {fetchGradovi} from "../../features/gradovi/gradThunk.js";
import Select from "react-select";

const Poslovnica = () => {
    const dispatch = useDispatch()
    const [naziv, setNaziv] = useState("");
    const [adresa, setAdresa] = useState("");
    const [IDbroj, setIDbroj] = useState("");
    const [sjedisteId, setSjedisteId] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const gradovi = useSelector((state) => state.grad.gradovi);
    const { companyId } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPoslovnica({ naziv, adresa, IDbroj, sjedisteId, companyId }));
    };

    useEffect(() => {
        dispatch(fetchGradovi());
    }, [dispatch]);

    useEffect(() => {
        if (sjedisteId) {
            const selectedGrad = gradovi.find((grad) => grad.id === sjedisteId);
            setPostalCode(selectedGrad ? selectedGrad.postanski_broj : "");
        } else {
            setPostalCode("");
        }
    }, [sjedisteId, gradovi]);

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto'
        >
            <h2 className='text-2xl font-bold mb-4'>Create Poslovnica</h2>


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
                    Adresa
                </label>
                <input
                    type='text'
                    value={adresa}
                    onChange={(e) => setAdresa(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    placeholder='Enter Adresa'
                    required
                />
            </div>

            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    ID Broj
                </label>
                <input
                    type='text'
                    value={IDbroj}
                    onChange={(e) => setIDbroj(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    placeholder='Enter ID broj'
                    required
                />
            </div>
            <div className='flex items-center'>
                <Select
                    options={gradovi.map((grad) => ({
                        value: grad.id,
                        label: grad.naziv,
                    }))}
                    value={
                        gradovi.find((grad) => grad.id === sjedisteId)
                            ? {
                                value: sjedisteId,
                                label: gradovi.find((grad) => grad.id === sjedisteId)
                                    .naziv,
                            }
                            : null
                    }
                    onChange={(selectedOption) =>
                        setSjedisteId(selectedOption ? selectedOption.value : null)
                    }
                    placeholder='Select City'
                    className='flex-grow'
                />
                {/*<button*/}
                {/*    type='button'*/}
                {/*    className='ml-2 p-2 bg-blue-500 text-white rounded'*/}
                {/*    onClick={() => openDrawer("city")}*/}
                {/*>*/}
                {/*    Add Grad*/}
                {/*</button>*/}
            </div>
            <input
                type='text'
                value={postalCode}
                readOnly
                placeholder='Postal Code'
                className='w-full p-2 border border-gray-300 rounded'
            />

            <button
                type='submit'
                className={`w-full p-2 text-black border-2 rounded `}

            >
                Create
            </button>
        </form>
    )
}

export default Poslovnica;