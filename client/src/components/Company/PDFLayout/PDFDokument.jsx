import React from "react";
import "../../../styles/pdf.css";

const PdfContent = React.forwardRef(
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
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  R.br.
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Sifra
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Naziv
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Jed.mj.
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Količina
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Fakturna cijena bez PDV-a
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Fakturna vrijednost bez PDV-a
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Zavisni troskovi bez PDV-a
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Nabavna cijena po jedinici mjere
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Nabavna vrijednost bez PDV-a
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Stopa razlike u cijeni
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Iznos razlike u cijeni
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Prodajna vrijednost proizvoda bez PDV-a
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Stopa PDV-a
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Iznos PDV-a
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Maloprodajna vrijednost sa PDV-om
                </th>
                <th className='border border-gray-300 p-3 font-medium text-sm'>
                  Maloprodajna cijena sa PDV-om
                </th>
              </tr>
            </thead>
            <tbody>
              {artikli.map((artikl, index) => (
                <tr key={index}>
                  <td className='border border-gray-300 p-3'>{index + 1}</td>
                  <td className='border border-gray-300 p-3'>{artikl.sifra}</td>
                  <td className='border border-gray-300 p-3 whitespace-nowrap'>
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
                    {roundTo(aktivniPdv?.stopaPDV, 2)}%
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
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-between mt-4'>
            <span className='text-sm'>M.P.</span>
            <span className='text-sm'>Odgovorno lice</span>
          </div>
        </div>
      </div>
    );
  }
);

export default PdfContent;
