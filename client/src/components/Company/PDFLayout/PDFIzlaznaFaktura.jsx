import React from "react";
import "../../../styles/pdf.css";

const PDFIzlaznaFaktura = React.forwardRef(
    ({ artikli, aktivniPdv, roundTo, naziv, brojDokumenta, dobavljac }, ref) => {
        return (
            <div ref={ref} className='printable-area'>
                <div className='mx-auto bg-white p-8 mt-8'>
                    <div className='flex justify-between items-center mb-4'>
                        <span className='text-lg'>KALKULACIJA: {brojDokumenta}</span>
                        <span className='text-sm'>Obrazac KCM</span>
                    </div>
                    <div className='flex justify-between mb-4'>
                        <div className='w-1/2 pr-2'>
                            <p className='mb-2'>
                                Naziv i sjedište trgovca ______________________________
                            </p>
                            <p className='mb-2'>Naziv i sjedište dobavljača {dobavljac}</p>
                            <p className='mb-2'>
                                Naziv i sjedište prodajnog objekta ili drugog prodajnog mjesta{" "}
                                <br />
                                po kome Izvršena je nabavka __________________
                            </p>
                            <p className='mt-2'>
                                Datum sačinjavanja kalkulacije __________________
                            </p>
                        </div>
                        <div className='w-1/2 pl-2'>
                            <p className='mb-2'>Naziv, broj i datum dokumenta {naziv}</p>
                        </div>
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
                        {artikli.map((artikl, index) => (
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
                                            ? (artikl.cijena * 1.17) * artikl.kolicina // Ako je popust 0, računa cijenu s PDV-om i množi s količinom
                                            : ((artikl.cijena - (artikl.cijena * artikl.popust) / 100) * 1.17) * artikl.kolicina, // Ako ima popusta, računa cijenu s popustom, dodaje PDV i množi s količinom
                                        2
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div>
                        <div className='flex justify-end'>
                            <div className='mt-4 p-5 flex gap-1 w-1/2 h-auto flex-col'>
                                <div className='flex justify-between'>
                                    <h4 className='text-md font-semibold'>Ukupno bez popusta:</h4>
                                    <p className='text-md'>{roundTo(
                                        artikli.reduce((acc, artikl) =>
                                                acc + artikl.cijena * artikl.kolicina,
                                            0),
                                        2
                                    )} KM</p>
                                </div>
                                <div className='flex justify-between'>
                                    <h4 className='text-md font-semibold'>Popust:</h4>
                                    <p className='text-md'>{roundTo(
                                        artikli.reduce((acc, artikl) =>
                                                acc + (artikl.cijena * artikl.kolicina) - ((artikl.cijena - (artikl.cijena * artikl.popust) / 100) * artikl.kolicina),
                                            0),
                                        2
                                    )} KM</p>
                                </div>
                                <div className='border-t border-gray-400'></div>
                                <div className='flex justify-between'>
                                    <h4 className='text-md font-semibold'>Ukupno KM bez PDV-a:</h4>
                                    <p className='text-md'>{roundTo(
                                        artikli.reduce((acc, artikl) =>
                                                acc + (artikl.cijena * artikl.kolicina) - ((artikl.cijena * artikl.kolicina) - ((artikl.cijena - (artikl.cijena * artikl.popust) / 100) * artikl.kolicina)),
                                            0),
                                        2
                                    )} KM</p>
                                </div>
                                <div className='flex justify-between'>
                                    <h4 className='text-md font-semibold'>PDV po stopi 17%:</h4>
                                    <p className='text-md'>{roundTo(
                                        artikli.reduce((acc, artikl) =>
                                                acc + ((artikl.cijena * 1.17) * artikl.kolicina) - (artikl.cijena * artikl.kolicina),
                                            0),
                                        2
                                    )} KM</p>
                                </div>
                                <div className='flex justify-between'>
                                    <h4 className='text-md font-semibold'>Ukupno KM:</h4>
                                    <p className='text-md'>{roundTo(
                                        artikli.reduce((acc, artikl) =>
                                                artikl.popust === 0
                                                    ? acc + (artikl.cijena * 1.17) * artikl.kolicina // Ako je popust 0, računa cijenu s PDV-om i množi s količinom
                                                    : acc + ((artikl.cijena - (artikl.cijena * artikl.popust) / 100) * 1.17) * artikl.kolicina, // Ako ima popusta, računa cijenu s popustom, dodaje PDV i množi s količinom
                                            0),
                                        2
                                    )} KM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <span className='text-sm'>M.P.</span>
                        <span className='text-sm'>Odgovorno lice</span>
                    </div>
                </div>
            </div>
        );
    }
);

export default PDFIzlaznaFaktura;
