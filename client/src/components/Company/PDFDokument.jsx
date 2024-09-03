import React from 'react';
import "../../styles/pdf.css"

// eslint-disable-next-line react/display-name,react/prop-types
const PdfContent = React.forwardRef(({ artikli, aktivniPdv, roundTo, naziv, brojDokumenta, dobavljac }, ref) => {
    return (
        <div ref={ref} className="printable-area">
            <div className="mx-auto bg-white p-8 mt-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">KALKULACIJA CIJENA BROJ {brojDokumenta}</span>
                    <span className="text-sm">Obrazac KCM</span>
                </div>
                <div className="flex justify-between mb-4">
                    <div className="w-1/2 pr-2">
                        <p className="mb-2">Naziv i sjedište trgovca ______________________________</p>
                        <p className="mb-2">Naziv i sjedište dobavljača {dobavljac}</p>
                        <p className="mb-2">Naziv i sjedište prodajnog objekta ili drugog po kome __________________</p>
                        <p className="mb-2">Prodajnog mjesta ______________________________</p>
                        <p>Izvršena je nabavka</p>
                        <p className="mt-2">Datum sačinjavanja kalkulacije __________________</p>
                    </div>
                    <div className="w-1/2 pl-2">
                        <p className="mb-2">Naziv, broj i datum dokumenta {naziv}</p>
                    </div>
                </div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 p-3 font-medium">Redni broj</th>
                        <th className="border border-gray-300 p-3 font-medium">Naziv</th>
                        <th className="border border-gray-300 p-3 font-medium">Jedinica mjere</th>
                        <th className="border border-gray-300 p-3 font-medium">Količina</th>
                        <th className="border border-gray-300 p-3 font-medium">Fakturna cijena bez PDV-a</th>
                        <th className="border border-gray-300 p-3 font-medium">Fakturna vrijednost bez PDV-a</th>
                        <th className="border border-gray-300 p-3 font-medium">Zavisni troskovi bez PDV-a</th>
                        <th className="border border-gray-300 p-3 font-medium">Nabavna cijena po jedinici mjere</th>
                        <th className="border border-gray-300 p-3 font-medium">Nabavna vrijednost bez PDV-a</th>
                        <th className="border border-gray-300 p-3 font-medium">Stopa razlike u cijeni</th>
                        <th className="border border-gray-300 p-3 font-medium">Iznos razlike u cijeni</th>
                        <th className="border border-gray-300 p-3 font-medium">Prodajna vrijednost proizvoda bez PDV-a
                        </th>
                        <th className="border border-gray-300 p-3 font-medium">Stopa PDV-a</th>
                        <th className="border border-gray-300 p-3 font-medium">Iznos PDV-a</th>
                        <th className="border border-gray-300 p-3 font-medium">Maloprodajna vrijednost sa PDV-om</th>
                        <th className="border border-gray-300 p-3 font-medium">Maloprodajna cijena sa PDV-om</th>
                    </tr>
                    </thead>
                    <tbody>
                    {artikli.map((artikl, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-3">{index + 1}</td>
                            <td className="border border-gray-300 p-3">{artikl.naziv}</td>
                            <td className="border border-gray-300 p-3">{artikl.jedinicaMjere}</td>
                            <td className="border border-gray-300 p-3">{artikl.kolicina}</td>
                            <td className="border border-gray-300 p-3">{artikl.cijena}</td>
                            <td className="border border-gray-300 p-3">{artikl.kolicina * artikl.cijena}</td>
                            <td className="border border-gray-300 p-3">0</td>
                            <td className="border border-gray-300 p-3">{artikl.cijena}</td>
                            <td className="border border-gray-300 p-3">{artikl.kolicina * artikl.cijena}</td>
                            <td className="border border-gray-300 p-3">{roundTo(((artikl.kolicina * artikl.mpcijena) - (artikl.kolicina * artikl.cijena)) / (artikl.kolicina * artikl.mpcijena) * 100, 2)}%</td>
                            <td className="border border-gray-300 p-3">{(artikl.kolicina * artikl.mpcijena) - (artikl.kolicina * artikl.cijena)}</td>
                            <td className="border border-gray-300 p-3">{(artikl.kolicina * artikl.mpcijena) - ((artikl.kolicina * artikl.mpcijena) * 17) / 100}</td>
                            <td className="border border-gray-300 p-3">{aktivniPdv.stopaPDV}%</td>
                            <td className="border border-gray-300 p-3">{((artikl.kolicina * artikl.mpcijena) * 17) / 100}</td>
                            <td className="border border-gray-300 p-3">{artikl.kolicina * artikl.mpcijena}</td>
                            <td className="border border-gray-300 p-3">{artikl.mpcijena}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <span className="text-sm">M.P.</span>
                    <span className="text-sm">Odgovorno lice</span>
                </div>
            </div>
        </div>
    );
});

export default PdfContent;