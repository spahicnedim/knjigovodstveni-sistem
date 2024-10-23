import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import { fetchKnjige } from '../../../features/knjige/knjigeThunks';
import {roundTo} from "../../../utils/RoundTo.jsx";


const KUF = () => {
    const dispatch = useDispatch();
    const { knjigeId, companyId } = useParams(); // Dohvatanje ID-a knjige iz URL-a

    const { knjiga, loading, error } = useSelector((state) => state.knjige); // Pristup Redux stanju
    // Učitaj knjigu po ID-u kada se komponenta učita
    useEffect(() => {
        if (knjigeId) {
            dispatch(fetchKnjige({knjigeId, companyId}));
        }
    }, [dispatch, knjigeId, companyId]);

    if (loading) return <p>Učitavanje...</p>;
    if (error) return <p>Greška: {error}</p>;

    const calculateTotalWithoutPDV = (artikli) => {
        return artikli.reduce((acc, artikal) => {
            const cijena = parseFloat(artikal.cijena);
            const kolicina = parseFloat(artikal.kolicina);
            return acc + (isNaN(cijena) || isNaN(kolicina) ? 0 : cijena * kolicina);
        }, 0);
    };

    const calculateTotalWithPDV = (totalWithoutPDV) => {
        const total = parseFloat(totalWithoutPDV);
        return isNaN(total) ? 0 : total * 1.17;
    };

    let totalWithoutPDVAllDocuments = 0;
    let totalWithPDVAllDocuments = 0;
    let totalPDVAllDocuments = 0;
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">KUF - Knjiga ulaznih faktura</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr className="bg-white border-b">
                    <th className="text-left p-2 border-r">Red. Br.</th>
                    <th className="text-left p-2 border-r">Broj fakture</th>
                    <th className="text-left p-2 border-r">Datum fakture</th>
                    <th className="text-left p-2 border-r">Dobavljač</th>
                    <th className="text-left p-2 border-r">ID za poreze</th>
                    <th className="text-right p-2 border-r">Iznos bez PDV-a</th>
                    <th className="text-right p-2 border-r">Iznos sa PDV-om</th>
                    <th className="text-right p-2 border-r">Paušalna naknada</th>
                    <th className="text-right p-2 border-r">PDV u fakturi</th>
                    <th className="text-right p-2 border-r">PDV koji se može odbiti</th>
                    <th className="text-right p-2">PDV koji se ne može odbiti</th>
                </tr>
                </thead>
                <tbody>
                {knjiga?.dokumenti.map((dokument, index) => {
                    const totalWithoutPDV = parseFloat(calculateTotalWithoutPDV(dokument.DokumentiArtikli));
                    const totalWithPDV = parseFloat(calculateTotalWithPDV(totalWithoutPDV));
                    const pdvAmount = totalWithPDV - totalWithoutPDV;

                    totalWithoutPDVAllDocuments += totalWithoutPDV;
                    totalWithPDVAllDocuments += totalWithPDV;
                    totalPDVAllDocuments += pdvAmount;

                    console.log(typeof totalWithoutPDV);
                    return (
                        <tr key={dokument.id} className="border-b">
                            <td className="p-2 border-r">{index + 1}</td>
                            <td className="p-2 border-r">{dokument.redniBroj}</td>
                            <td className="p-2 border-r">{new Date(dokument.datumKreiranjaKalkulacije).toLocaleDateString()}</td>
                            <td className="p-2 border-r">{dokument.kupacDobavljac?.name}</td>
                            <td className="p-2 border-r">{dokument.kupacDobavljac?.IDbroj}</td>
                            <td className="p-2 text-right border-r">{roundTo(totalWithoutPDV, 2)}</td>
                            <td className="p-2 text-right border-r">{roundTo(totalWithPDV, 2)}</td>
                            <td className="p-2 text-right border-r">{roundTo(0, 2)}</td>
                            <td className="p-2 text-right border-r">{roundTo(pdvAmount, 2)}</td>
                            <td className="p-2 text-right border-r">{roundTo(pdvAmount, 2)}</td>
                            <td className="p-2 text-right">{roundTo(0, 2)}</td>
                        </tr>
                    );
                })}
                {/* Red za ukupne vrijednosti */}
                <tr className="bg-white font-bold">
                    <td colSpan="5" className="p-2 border-r text-right">Ukupno:</td>
                    <td className="p-2 text-right border-r">{roundTo(totalWithoutPDVAllDocuments, 2)}</td>
                    <td className="p-2 text-right border-r">{roundTo(totalWithPDVAllDocuments, 2)}</td>
                    <td className="p-2 text-right border-r">0.00</td>
                    <td className="p-2 text-right border-r">{roundTo(totalPDVAllDocuments, 2)}</td>
                    <td className="p-2 text-right border-r">{roundTo(totalPDVAllDocuments, 2)}</td>
                    <td className="p-2 text-right">0.00</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default KUF;