import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { MdEdit, MdEmail, MdDelete } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { useReactToPrint } from "react-to-print";
import PDFMaloprodajneKalkulacije from "../../PDFLayout/PDFMaloprodajnaKalkulacija.jsx";
import { roundTo } from "../../../../utils/RoundTo.jsx";
import { fetchArtikli } from "../../../../features/artikli/artikliThunks.js";
import { fetchKupciDobavljaci } from "../../../../features/kupacDobavljac/kupacDobavljacThunk.js";
import {deleteDokumentFakture, fetchPdv} from "../../../../features/dokumenti/dokumentThunks.js";
import { fetchDokumentiById } from "../../../../features/dokumenti/dokumentThunks.js";

export function DetaljiIzlazneFakture({ dokumentId }) {
    const contentRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { companyId } = useParams();

    useEffect(() => {
        dispatch(fetchDokumentiById(dokumentId));
        dispatch(fetchArtikli());
        dispatch(fetchKupciDobavljaci(companyId));
        dispatch(fetchPdv());
    }, [dispatch, dokumentId]);

    const dokument = useSelector((state) => state.dokument.current || {});

    const kupciDobavljaci = useSelector(
        (state) => state.kupacDobavljac.kupciDobavljaci
    );
    const pdv = useSelector((state) => state.dokument.pdv);
    const artikliList = useSelector((state) => state.artikl.artikli);

    const aktivniPdv = pdv.find((p) => p.Aktivan);

    const artikliDokumenta =
        dokument?.dokument?.DokumentiArtikli?.map((dokumentArtikl) => {
            const artiklInfo = dokumentArtikl.artikli;
            return {
                naziv: artiklInfo?.naziv,
                sifra: artiklInfo?.sifra,
                jedinicaMjere: artiklInfo?.jedinicaMjere,
                kolicina: dokumentArtikl.kolicina, // Ovo je količina iz 'DokumentiArtikli' tabele
                cijena: dokumentArtikl.cijena, // Ovo je cijena iz 'DokumentiArtikli' tabele
                popust: dokumentArtikl.popust, // Ovo je mpcijena iz 'DokumentiArtikli' tabele
            };
        }) || [];

    const dobavljac = kupciDobavljaci?.find(
        (dobavljac) => dobavljac.id === dokument?.dokument?.kupacDobavljacId
    );

    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
        pageStyle: `
      @page {
        size: A4 landscape;
        counter-increment: page;
      }
      body {
        -webkit-print-color-adjust: exact; 
        margin: 0; 
        overflow: hidden; 
      }
      header, footer {
        display: none; 
      }
      .printable-area {
        width: 100%; 
        height: auto; 
        box-sizing: border-box; 
      }
    `,
    });

    const handleClick = () => {
        // Navigirajte na rutu sa ID-jem
        navigate(`izlazna-faktura/${dokumentId}`);
    };

    if (!dokument || !dokument.dokument || !artikliList.length) {
        return <div>Loading...</div>; // Prikaz loadera dok podaci nisu dostupni
    }

    const handleDelete = () => {
        dispatch(deleteDokumentFakture(dokumentId))
    };


    return (
        <div>
            <div className='flex items-center'>
                <button
                    onClick={handleClick}
                    className='px-2 flex items-center space-x-1'
                >
                    <MdEdit className='w-4 h-4' />
                    <span>Edit</span>
                </button>
                <div className='w-px h-5 bg-gray-300 mx-2'></div>
                <button className='px-2 flex items-center space-x-1'>
                    <MdEmail className='w-4 h-4' />
                    <span>Pošalji Mail</span>
                </button>
                <div className='w-px h-5 bg-gray-300 mx-2'></div>
                <button
                    type='button'
                    onClick={handlePrint}
                    className='px-2 flex items-center space-x-1'
                >
                    <IoMdPrint className='w-4 h-4' />
                    <span>Print</span>
                </button>
                <div className='w-px h-5 bg-gray-300 mx-2'></div>
                <button type='button' onClick={handleDelete} className='px-2 flex items-center space-x-1'>
                    <MdDelete className='w-4 h-4' />
                    <span>Izbriši</span>
                </button>
            </div>
            <div className='border-b border-gray-300 pt-2' />
            <div className='mt-4'>
                <PDFMaloprodajneKalkulacije
                    ref={contentRef}
                    artikli={artikliDokumenta}
                    aktivniPdv={aktivniPdv}
                    roundTo={roundTo}
                    naziv={dokument.dokument.naziv}
                    brojDokumenta={dokument.dokument.redniBroj}
                    dobavljac={dobavljac ? dobavljac.name : "Nepoznat"}
                />
            </div>
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
                        Cijena bez PDV-a
                    </th>
                    <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                        Popust
                    </th>
                    <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm'>
                        Cijena sa PDV-om
                    </th>
                    <th className='border border-gray-300 p-3 bg-gray-100 font-normal text-sm '>
                        Iznos
                    </th>
                </tr>
                </thead>
                <tbody>
                {artikliDokumenta.map((artikl, index) => (
                    <tr key={index}>
                        <td className='border border-gray-300 p-3'>{index + 1}</td>
                        <td className='border border-gray-300 p-3'>
                            {artikl.sifra}
                        </td>
                        <td className='border border-gray-300 p-3'>
                            {artikl.naziv}
                        </td>
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
                            {artikl.popust || 0}%
                        </td>
                        <td className='border border-gray-300 p-3 text-right'>
                            {roundTo(
                                (artikl.cijena - ((artikl.cijena * artikl.popust) / 100)) + ((artikl.cijena - ((artikl.cijena * artikl.popust) / 100)) * 17) / 100,
                                2
                            )}
                        </td>
                        <td className='border border-gray-300 p-3 text-right'>
                            {roundTo(((artikl.cijena - ((artikl.cijena * artikl.popust) / 100)) * 1.17) * artikl.kolicina, 2)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className='flex justify-end'>
                <div className='mt-4 p-5 flex gap-4 w-1/2 h-32 bg-gray-50 drop-shadow-md flex-col'>
                    <div className='flex justify-between'>
                        <h4 className='text-lg font-semibold'>Iznos racuna:</h4>
                        <p className='text-xl'>
                            {roundTo(
                                artikliDokumenta.reduce(
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
                                artikliDokumenta.reduce(
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
        </div>
    );
}
