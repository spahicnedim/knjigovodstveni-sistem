import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import { fetchKnjige } from '../../../features/knjige/knjigeThunks';
import {roundTo} from "../../../utils/RoundTo.jsx";


export function KIF() {
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

    const calculateiznos = (artikli) => {
        return artikli.reduce((acc, artikal) => {
            if (artikal.popust === 0) {
                return acc + acc + (artikal.cijena * 1.17) * artikal.kolicina
            } else {
                return acc + ((artikal.cijena - (artikal.cijena * artikal.popust) / 100) * 1.17) * artikal.kolicina;
            }
        }, 0);
    };

    const calculateOsnovica = (artikli) => {
        return artikli.reduce((acc, artikal) => {
           return acc + ((artikal.cijena * artikal.kolicina) - ((artikal.cijena * artikal.kolicina) - ((artikal.cijena - (artikal.cijena * artikal.popust) / 100) * artikal.kolicina)))
        }, 0)
    }


    let totalIznosAllDocuments = 0;
    let totalOsnovicaAllDocuments = 0;
    let obracunatiPDVAllDocuments = 0;
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">KIF - Knjiga izlaznih faktura</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr className="bg-white border-b">
                    <th className="text-left p-2 border-r">Red. Br.</th>
                    <th className="text-left p-2 border-r">Broj fakture</th>
                    <th className="text-left p-2 border-r">Datum fakture</th>
                    <th className="text-left p-2 border-r">Kupac</th>
                    <th className="text-left p-2 border-r">ID za poreze</th>
                    <th className="text-right p-2 border-r">Iznos fakture</th>
                    <th className="text-right p-2 border-r">Iznos interne poreske fakture u vanposlovne svrhe</th>
                    <th className="text-right p-2 border-r">Iznos fakture za izvozne isporuke</th>
                    <th className="text-right p-2 border-r">Iznos fakture za ostale isporuke oslobodjene PDV-a</th>
                    <th className="text-right p-2 border-r">Osnovica za obracun PDV-a kupcima</th>
                    <th className="text-right p-2">Obracunati PDV na sve isporuke</th>
                </tr>
                </thead>
                <tbody>
                {knjiga?.dokumenti.map((dokument, index) => {
                    const totalIznos = parseFloat(calculateiznos(dokument.DokumentiArtikli));
                    const totalOsnovica = parseFloat(calculateOsnovica(dokument.DokumentiArtikli));
                    const totalObracunatiPDV = totalIznos - totalOsnovica;


                    totalIznosAllDocuments += totalIznos;
                    totalOsnovicaAllDocuments += totalOsnovica;
                    obracunatiPDVAllDocuments += totalObracunatiPDV;

                    return (
                        <tr key={dokument.id} className="border-b">
                            <td className="p-2 border-r">{index + 1}</td>
                            <td className="p-2 border-r">{dokument.redniBroj}</td>
                            <td className="p-2 border-r">{new Date(dokument.datumKreiranjaKalkulacije).toLocaleDateString()}</td>
                            <td className="p-2 border-r">{dokument.kupacDobavljac?.name}</td>
                            <td className="p-2 border-r">{dokument.kupacDobavljac?.IDbroj}</td>
                            <td className="p-2 text-right border-r">{roundTo(totalIznos, 2)}</td>
                            <td className="p-2 text-right border-r">0</td>
                            <td className="p-2 text-right border-r">0</td>
                            <td className="p-2 text-right border-r">0</td>
                            <td className="p-2 text-right border-r">{roundTo(totalOsnovica, 2)}</td>
                            <td className="p-2 text-right">{roundTo(totalObracunatiPDV, 2)}</td>
                        </tr>
                    );
                })}
                {/* Red za ukupne vrijednosti */}
                <tr className="bg-white font-bold">
                    <td colSpan="5" className="p-2 border-r text-right">Ukupno:</td>
                    <td className="p-2 text-right border-r">{roundTo(totalIznosAllDocuments, 2)}</td>
                    <td className="p-2 text-right border-r">0</td>
                    <td className="p-2 text-right border-r">0.00</td>
                    <td className="p-2 text-right border-r">0</td>
                    <td className="p-2 text-right border-r">{roundTo(totalOsnovicaAllDocuments, 2)}</td>
                    <td className="p-2 text-right">{roundTo(obracunatiPDVAllDocuments, 2)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}