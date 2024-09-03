import { useDispatch } from "react-redux";
import { useState } from "react";
import { createArtikli, fetchArtikli } from "../../../features/artikli/artikliThunks.js";

export const ArtikliForm = () => {

    const dispatch = useDispatch();

    const [naziv, setNaziv] = useState("");
    const [sifra, setSifra] = useState("");
    const [jedinicaMjere, setJedinicaMjere] = useState("");
    const [kolicina, setKolicina] = useState("");
    const [cijena, setCijena] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        const artiklData = {
            naziv,
            sifra,
            jedinicaMjere,
            kolicina,
            cijena,
        };

        dispatch(createArtikli(artiklData))
            .unwrap()
            .then(() => {
                // Osvježavanje liste artikala nakon uspješnog unosa
                dispatch(fetchArtikli());
                // Reset formi
                setNaziv("");
                setSifra("");
                setJedinicaMjere("");
                setKolicina("");
                setCijena("");
            })
            .catch((error) => {
                console.error("Failed to create artikl:", error);
            });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
        >
            <h2 className="text-2xl font-bold mb-4">Unos Artikala</h2>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Naziv
                </label>
                <input
                    type="text"
                    value={naziv}
                    onChange={(e) => setNaziv(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter naziv"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Šifra
                </label>
                <input
                    type="text"
                    value={sifra}
                    onChange={(e) => setSifra(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter šifra"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Jedinica Mjere
                </label>
                <input
                    type="text"
                    value={jedinicaMjere}
                    onChange={(e) => setJedinicaMjere(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter jedinica mjere"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded"
            >
                Kreiraj Artikl
            </button>
        </form>
    );
};