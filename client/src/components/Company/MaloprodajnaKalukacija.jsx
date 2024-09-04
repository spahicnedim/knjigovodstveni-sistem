import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchPoslovnice} from "../../features/poslovnice/poslovnicaThunks.js";
import {useParams} from "react-router-dom";
import {fetchSkladista} from "../../features/skladista/skladisteThunks.js";
import {fetchDokumenti} from "../../features/dokumenti/dokumentThunks.js";


export function MaloprodajnaKalukacija() {
    const dispatch = useDispatch()
    const [poslovniceId, setPoslovnicaId] = useState(null);
    const [skladisteId, setSkladisteId] = useState(null);
    const [filteredSkladista, setFilteredSkladista] = useState([]);

    const poslovnice = useSelector((state) => state.poslovnica.poslovnice);
    const skladista = useSelector((state) => state.skladiste.skladista)
    const dokumenti = useSelector((state) => state.dokument.dokumenti);

    const { companyId } = useParams();

    useEffect(() => {
        dispatch(fetchPoslovnice(companyId))
        dispatch(fetchSkladista())
    }, [dispatch, companyId])

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

    useEffect(() => {
        if (skladisteId) {
            dispatch(fetchDokumenti(skladisteId));
        }
    }, [dispatch, skladisteId]);

    return (
        <div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Poslovnica</label>
                <select
                    value={poslovniceId}
                    onChange={(e) => setPoslovnicaId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
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

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Skladište</label>
                <select
                    value={skladisteId}
                    onChange={(e) => setSkladisteId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
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
            <div className="mt-6">
                <h2 className="text-xl font-medium mb-4">Dokumenti</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Naziv Dokumenta</th>
                        <th className="py-2 px-4 border-b">Datum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dokumenti.map((dokument) => (
                        <tr key={dokument.id}>
                            <td className="py-2 px-4 border-b">{dokument.naziv}</td>
                            <td className="py-2 px-4 border-b">{dokument.datumIzdavanjaDokumenta}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}