import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchArtikli } from "../../features/artikli/artikliThunks.js";
import { fetchSkladista } from "../../features/skladista/skladisteThunks.js";
import { submitPOS } from "../../features/POS/posThunks.js";

export function POSKasa() {
    const dispatch = useDispatch();
    const [selectedArtikli, setSelectedArtikli] = useState([]);
    const [filteredSkladista, setFilteredSkladista] = useState([]);
    const [inputValue, setInputValue] = useState(""); // Za unos količine

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

    const handleNumericPadClick = (num) => {
        setInputValue(prev => prev + num);
    };

    const handleClearInput = () => {
        setInputValue("");
    };

    const handleQuantityPadSubmit = (artikalId) => {
        if (inputValue) {
            handleQuantityChange(artikalId, inputValue);
            handleClearInput();
        }
    };

    // Funkcija za izračunavanje ukupne cijene
    const calculateTotalPrice = () => {
        return selectedArtikli.reduce((total, item) => {
            const itemPrice = item.ArtikliCijene[0]?.mpcijena || 0;
            return total + itemPrice * item.quantity;
        }, 0);
    };

    const getKolicinaForSkladiste = (artikal) => {
        const skladisteArtikal = artikal.skladisteArtikli.find(
            (skladisteArtikal) =>
                filteredSkladista.some(
                    (skladiste) => skladiste.id === skladisteArtikal.skladisteId
                )
        );
        return skladisteArtikal ? skladisteArtikal.kolicina : "Nema na stanju";
    };

    const handleSubmitPOS = () => {
        const getSkladisteForPoslovnicu = () => {
            const skladisteArtikal = selectedArtikli.map((item) => {
                return item.skladisteArtikli.find((skladisteArtikal) =>
                    filteredSkladista.some(
                        (skladiste) => skladiste.id === skladisteArtikal.skladisteId
                    )
                );
            });

            const validSkladiste = skladisteArtikal.find(s => s);
            return validSkladiste ? validSkladiste.skladisteId : null;
        };

        const skladisteId = getSkladisteForPoslovnicu();

        if (!skladisteId) {
            console.error("Nema dostupnog skladišta za poslovnicu.");
            return;
        }

        const posData = {
            skladisteId: skladisteId,
            artikli: selectedArtikli.map((item) => {
                const kolicina = getKolicinaForSkladiste(item);
                if (kolicina === "Nema na stanju") {
                    console.error(`Artikal ${item.naziv} nije dostupan u skladištu.`);
                    return null;
                }
                return {
                    artikliId: item.id,
                    kolicina: item.quantity,
                };
            }).filter(item => item !== null)
        };

        if (posData.artikli.length === 0) {
            console.error("Nema artikala dostupnih u skladištima vezanim za poslovnicu.");
            return;
        }

        console.log("POS Data za skidanje sa stanja:", posData);
        dispatch(submitPOS(posData));

        setSelectedArtikli([]);
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
                                <p>Količina: {getKolicinaForSkladiste(artikal)}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nema dostupnih artikala.</p>
                )}
            </div>

            <div className="w-1/3 p-4 bg-gray-100 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-4">Odabrani Artikli</h2>
                    {selectedArtikli.length > 0 ? (
                        <ul>
                            {selectedArtikli.map((artikal) => (
                                <li key={artikal.id} className="border p-4 mb-2">
                                    <h3 className="font-semibold">{artikal.naziv}</h3>
                                    <p>Cijena: {artikal.ArtikliCijene[0]?.mpcijena} KM</p>
                                    <p>Količina: {artikal.quantity}</p>
                                    <button
                                        onClick={() => handleRemoveFromCart(artikal.id)}
                                        className="mt-2 p-1 bg-red-500 text-white rounded"
                                    >
                                        Ukloni
                                    </button>
                                    <button
                                        onClick={() => handleQuantityPadSubmit(artikal.id)}
                                        className="mt-2 p-1 bg-green-500 text-white rounded"
                                    >
                                        Promijeni Količinu
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nema odabranih artikala.</p>
                    )}
                </div>

                {/* Numerička tastatura */}
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Unesite Količinu:</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(num => (
                            <button
                                key={num}
                                className="p-4 bg-gray-300 rounded text-xl"
                                onClick={() => handleNumericPadClick(num)}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2">
                        <button onClick={handleClearInput} className="p-2 bg-red-500 text-white rounded">Obriši</button>
                        <span className="text-xl font-semibold">{inputValue}</span>
                    </div>
                </div>

                {/* Prikaz ukupne cijene */}
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Ukupno:</h3>
                    <p className="text-2xl font-semibold">{calculateTotalPrice()} KM</p>
                </div>

                <button
                    onClick={handleSubmitPOS}
                    className="mt-4 p-4 bg-blue-500 text-white rounded font-bold"
                >
                    Potvrdi Kupovinu
                </button>
            </div>
        </div>
    );
}
