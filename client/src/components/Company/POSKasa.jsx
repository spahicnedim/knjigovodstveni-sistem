import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchArtikli } from "../../features/artikli/artikliThunks.js";
import { fetchSkladista } from "../../features/skladista/skladisteThunks.js";
import { submitPOS } from "../../features/POS/posThunks.js"; // Ovdje će biti funkcija za smanjenje količine

export function POSKasa() {
    const dispatch = useDispatch();
    const [selectedArtikli, setSelectedArtikli] = useState([]);
    const [filteredSkladista, setFilteredSkladista] = useState([]);

    // Dohvaćanje liste artikala i skladišta iz Redux store-a
    const artikliList = useSelector((state) => state.artikl.artikli);
    const skladista = useSelector((state) => state.skladiste.skladista);
    const userPoslovnicaId = useSelector((state) => state.auth.user.poslovniceId);

    useEffect(() => {
        dispatch(fetchSkladista());
    }, [dispatch]);

    useEffect(() => {
        if (userPoslovnicaId) {
            dispatch(fetchArtikli(userPoslovnicaId));
        }
    }, [dispatch, userPoslovnicaId]);

    useEffect(() => {
        if (userPoslovnicaId) {
            const relevantSkladista = skladista.filter(
                (skladiste) => skladiste.poslovnicaId === Number(userPoslovnicaId)
            );
            setFilteredSkladista(relevantSkladista);
        } else {
            setFilteredSkladista([]);
        }
    }, [userPoslovnicaId, skladista]);

    const handleAddToCart = (artikal) => {
        const existingArtikal = selectedArtikli.find(item => item.id === artikal.id);
        if (existingArtikal) {
            setSelectedArtikli(prev =>
                prev.map(item =>
                    item.id === artikal.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setSelectedArtikli(prev => [...prev, { ...artikal, quantity: 1 }]);
        }
    };

    const handleRemoveFromCart = (artikalId) => {
        setSelectedArtikli(prev => prev.filter(item => item.id !== artikalId));
    };

    const handleQuantityChange = (artikalId, quantity) => {
        setSelectedArtikli(prev =>
            prev.map(item =>
                item.id === artikalId
                    ? { ...item, quantity: Number(quantity) }
                    : item
            )
        );
    };

    // Funkcija za izračunavanje ukupne cijene
    const calculateTotalPrice = () => {
        return selectedArtikli.reduce((total, item) => {
            const itemPrice = item.ArtikliCijene[0]?.mpcijena || 0;
            return total + itemPrice * item.quantity;
        }, 0);
    };

    // Funkcija za slanje zahtjeva za skidanje sa stanja
    const handleSubmitPOS = () => {
        const posData = {
            skladisteId: filteredSkladista[0]?.id, // Pretpostavljamo da uzima iz prvog relevantnog skladišta
            artikli: selectedArtikli.map((item) => ({
                artikliId: item.id,
                kolicina: item.quantity,
            })),
        };

        console.log("POS Data za skidanje sa stanja:", posData);
        dispatch(submitPOS(posData)); // Ovdje se dispatcha akcija za skidanje sa stanja
    };

    return (
        <div className="flex">
            <div className="w-2/3 p-4">
                <h2 className="text-xl font-bold mb-4">Artikli</h2>
                {artikliList && artikliList.length > 0 ? (
                    <ul className="grid grid-cols-3 gap-4">
                        {artikliList.map(artikal => (
                            <li
                                key={artikal.id}
                                className="border p-4 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleAddToCart(artikal)}
                            >
                                <h3 className="font-semibold">{artikal.naziv}</h3>
                                <p>Cijena: {artikal.ArtikliCijene[0]?.mpcijena} KM</p>
                                <p>Količina: {artikal.skladisteArtikli.length > 0 ? artikal.skladisteArtikli[0].kolicina : "Nema na stanju"}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nema dostupnih artikala.</p>
                )}
            </div>

            <div className="w-1/3 p-4 bg-gray-100">
                <h2 className="text-xl font-bold mb-4">Odabrani Artikli</h2>
                {selectedArtikli.length > 0 ? (
                    <ul>
                        {selectedArtikli.map((artikal) => (
                            <li key={artikal.id} className="border p-4 mb-2">
                                <h3 className="font-semibold">{artikal.naziv}</h3>
                                <p>Cijena: {artikal.ArtikliCijene[0]?.mpcijena} KM</p>
                                <p>Količina: {artikal.quantity}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nema odabranih artikala.</p>
                )}
                <button
                    onClick={handleSubmitPOS}
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                >
                    Printaj
                </button>
            </div>
        </div>
    );
}
