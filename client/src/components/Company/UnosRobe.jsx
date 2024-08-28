import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {createDokument} from "../../features/dokumenti/dokumentThunks.js";
import { useParams } from "react-router-dom";
import {fetchSkladista} from "../../features/skladista/skladisteThunks.js";
import {fetchPoslovnice} from "../../features/poslovnice/poslovnicaThunks.js";
import {fetchVrstaDokumenta} from "../../features/vrstaDokumenta/vrstaDokumentaThunks.js";
import {fetchArtikli} from "../../features/artikli/artikliThunks.js";
import Drawer from "../Drawer";
import {ArtikliForm} from "./ArtikliForm.jsx";

export const UnosRobe = () => {
    const dispatch = useDispatch()
    const [naziv, setNaziv] = useState("");
    const [redniBroj, setRedniBroj] = useState(0);
    const [poslovniceId, setPoslovnicaId] = useState(null);
    const [skladisteId, setSkladisteId] = useState(null);
    const [filteredSkladista, setFilteredSkladista] = useState([]);
    const [vrstaDokumentaId, setVrstaDokumentaId] = useState(null);
    const [artikli, setArtikli] = useState([]); // Lista artikala za dokument
    const [odabraniArtikl, setOdabraniArtikl] = useState(null); // Odabrani artikl iz dropdowna
    const [kolicina, setKolicina] = useState(0);
    const [cijena, setCijena] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState("");


    const poslovnice = useSelector((state) => state.poslovnica.poslovnice);
    const skladista = useSelector((state) => state.skladiste.skladista);
    const vrstaDokumenta = useSelector((state) => state.vrstaDokumenta.vrsteDokumenata);
    const artikliList = useSelector((state) => state.artikl.artikli);

    const { companyId } = useParams();

    const openDrawer = (content) => {
        setDrawerContent(content);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setDrawerContent("");
    };

    useEffect(() => {
        dispatch(fetchPoslovnice());
        dispatch(fetchSkladista());
        dispatch(fetchVrstaDokumenta())
        dispatch(fetchArtikli());
    }, [dispatch]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Provjerite da li su svi podaci ispravni prije slanja
        dispatch(createDokument({
            naziv,
            redniBroj: parseInt(redniBroj, 10),
            poslovniceId: parseInt(poslovniceId, 10),
            skladisteId: parseInt(skladisteId, 10),
            vrstaDokumentaId: parseInt(vrstaDokumentaId, 10),
            artikli, // Provjerite da li je ovo lista artikala sa validnim ID-evima
            companyId
        }));
    };

    const handleOdabraniArtiklChange = (e) => {
        const artiklId = e.target.value;
        const selectedArtikl = artikliList.find(
            (artikl) => artikl.id === parseInt(artiklId, 10)
        );
        if (selectedArtikl) {
            setOdabraniArtikl({
                ...selectedArtikl,
                kolicina: 0, // Resetiramo količinu prilikom odabira novog artikla
                cijena: selectedArtikl.ArtikliCijene[0]?.cijena || 0,
            });
        }
    };

    const handleAddArtikl = () => {
        if (odabraniArtikl && kolicina > 0) {
            const artiklZaDodavanje = {
                ...odabraniArtikl,
                kolicina: parseFloat(kolicina),
                cijena: parseFloat(cijena),
            };
            setArtikli([...artikli, artiklZaDodavanje]);
            setOdabraniArtikl(null);
            setKolicina(0);
            setCijena(0);
        }
    };

    useEffect(() => {
        if (odabraniArtikl) {
            // Nađi zadnju cijenu iz liste cijena
            const zadnjaCijena = odabraniArtikl.ArtikliCijene.slice(-1)[0]?.cijena || 0;
            setCijena(zadnjaCijena);
        }
    }, [odabraniArtikl]);


    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <form
                onSubmit={handleSubmit}
                className=""
            >
                <h2 className="text-2xl font-semibold mb-6">Kreiraj Dokument</h2>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Naziv</label>
                    <input
                        type="text"
                        value={naziv}
                        onChange={(e) => setNaziv(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Unesite naziv"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Broj dokumenta</label>
                    <input
                        type="number"
                        value={redniBroj}
                        onChange={(e) => setRedniBroj(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Unesite broj dokumenta"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Vrsta Dokumenta</label>
                    <select
                        value={vrstaDokumentaId}
                        onChange={(e) => setVrstaDokumentaId(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                    >
                        <option value="">Odaberite vrstu dokumenta</option>
                        {vrstaDokumenta.map((vrsta) => (
                            <option key={vrsta.id} value={vrsta.id}>
                                {vrsta.naziv}
                            </option>
                        ))}
                    </select>
                </div>

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

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Dodaj Artikl</h3>

                    <div className="flex items-center mb-4">
                        <select
                            value={odabraniArtikl?.id || ""}
                            onChange={handleOdabraniArtiklChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Odaberite artikl</option>
                            {artikliList.map((artikl) => (
                                <option key={artikl.id} value={artikl.id}>
                                    {artikl.naziv}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={() => openDrawer("artikli")}
                            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                        >
                            +
                        </button>
                    </div>

                    {odabraniArtikl && (
                        <div className="flex items-center mb-4">
                            <input
                                type="number"
                                value={kolicina}
                                onChange={(e) => setKolicina(e.target.value)}
                                placeholder="Količina"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="number"
                                value={cijena}
                                onChange={(e) => setCijena(e.target.value)}
                                placeholder="Cijena"
                                className="w-full p-3 border border-gray-300 rounded-lg ml-4"
                            />
                            <button
                                type="button"
                                onClick={handleAddArtikl}
                                className="ml-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
                            >
                                Dodaj
                            </button>
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Uneseni Artikli</h3>
                    {artikli.length > 0 ? (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                            <tr>
                                <th className="border border-gray-300 p-3">Naziv</th>
                                <th className="border border-gray-300 p-3">Količina</th>
                                <th className="border border-gray-300 p-3">Cijena</th>
                                <th className="border border-gray-300 p-3">Ukupno</th>
                            </tr>
                            </thead>
                            <tbody>
                            {artikli.map((artikl, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 p-3">{artikl.naziv}</td>
                                    <td className="border border-gray-300 p-3">{artikl.kolicina}</td>
                                    <td className="border border-gray-300 p-3">{artikl.cijena}</td>
                                    <td className="border border-gray-300 p-3">{artikl.kolicina * artikl.cijena}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">Nema unesenih artikala.</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
                    >
                        Sačuvaj
                    </button>
                </div>
            </form>

            <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
                {drawerContent === "artikli" && <ArtikliForm />}
            </Drawer>
        </div>
    );
};
