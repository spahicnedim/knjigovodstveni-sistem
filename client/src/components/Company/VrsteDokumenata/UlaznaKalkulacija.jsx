import {ArtikliForm} from '../Forme/ArtikliForm.jsx';
import Drawer from '../../Drawer.jsx';
import PdfContent from '../PDFLayout/PDFDokument.jsx';
import {roundTo} from "../../../utils/RoundTo.jsx";
import Select from "react-select";

const UlaznaKalkulacija = ({
                               naziv,
                               setNaziv,
                               redniBroj,
                               setRedniBroj,
                               poslovniceId,
                               setPoslovnicaId,
                               skladisteId,
                               setSkladisteId,
                               dobavljacId,
                               setDobavljacId,
                               poslovnice,
                               filteredSkladista,
                               kupciDobavljaci,
                               artikliList,
                               odabraniArtikl,
                               setOdabraniArtikl,
                               handleOdabraniArtiklChange,
                               kolicina,
                               setKolicina,
                               cijena,
                               setCijena,
                               mpcijena,
                               setMpCijena,
                               handleAddArtikl,
                               artikli,
                               isContentVisible,
                               contentRef,
                               aktivniPdv,
                               handleGeneratePDF,
                               handlePrint,
                               handleToggleContent,
                               isDrawerOpen,
                               closeDrawer,
                               drawerContent,
                               openDrawer
                         }) => (
    <>
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
            <label className="block text-gray-700 text-sm font-medium mb-2">Dobavljač</label>
            <select
                value={dobavljacId}
                onChange={(e) => setDobavljacId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
            >
                <option value="">Odaberite dobavljača</option>
                {kupciDobavljaci
                    .filter((dobavljac) => dobavljac.dobavljac === true)
                    .map((dobavljac) => (
                        <option key={dobavljac.id} value={dobavljac.id}>
                            {dobavljac.name}
                        </option>
                    ))}
            </select>
        </div>

        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Dodaj Artikl</h3>

            <div className="flex items-center mb-4">
                {/*<select*/}
                {/*    value={odabraniArtikl?.id || ""}*/}
                {/*    onChange={handleOdabraniArtiklChange}*/}
                {/*    className="w-full p-3 border border-gray-300 rounded-lg"*/}
                {/*>*/}
                {/*    <option value="">Odaberite artikl</option>*/}
                {/*    {artikliList.map((artikl) => (*/}
                {/*        <option key={artikl.id} value={artikl.id}>*/}
                {/*            {artikl.naziv}*/}
                {/*        </option>*/}
                {/*    ))}*/}
                {/*</select>*/}
                <Select
                    options={artikliList.map((artikl) => ({
                        value: artikl.id,
                        label: artikl.naziv,
                    }))}
                    value={
                        artikliList.find((artikl) => artikl.id === odabraniArtikl?.id)
                            ? {
                                value: odabraniArtikl.id,
                                label: artikliList.find((artikl) => artikl.id === odabraniArtikl.id).naziv,
                            }
                            : null
                    }
                    onChange={(selectedOption) =>
                        setOdabraniArtikl(selectedOption ? artikliList.find((artikl) => artikl.id === selectedOption.value) : null)
                    }
                    placeholder="Odaberite artikl"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
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
                    <label>Kolicina:</label>
                    <input
                        type="number"
                        value={kolicina}
                        onChange={(e) => setKolicina(e.target.value)}
                        placeholder="Količina"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <label>Nabavna cijena:</label>
                    <input
                        type="number"
                        value={cijena}
                        onChange={(e) => setCijena(e.target.value)}
                        placeholder="Cijena"
                        className="w-full p-3 border border-gray-300 rounded-lg ml-4"
                    />
                    <label>Maloprodajna cijena:</label>
                    <input
                        type="number"
                        value={mpcijena}
                        onChange={(e) => setMpCijena(e.target.value)}
                        placeholder="Maloprodajna cijena"
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

        <h1>Naslov Dokumenta</h1>
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Uneseni Artikli</h3>
            {artikli.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 p-3">Redni broj</th>
                        <th className="border border-gray-300 p-3">Naziv</th>
                        <th className="border border-gray-300 p-3">Jedinica mjere</th>
                        <th className="border border-gray-300 p-3">Količina</th>
                        <th className="border border-gray-300 p-3">Fakturna cijena bez PDV-a</th>
                        <th className="border border-gray-300 p-3">Fakturna vrijednost bez PDV-a</th>
                        <th className="border border-gray-300 p-3">Zavisni troskovi bez PDV-a</th>
                        <th className="border border-gray-300 p-3">Nabavna cijena po jedinici mjere</th>
                        <th className="border border-gray-300 p-3">Nabavna vrijednost bez PDV-a</th>
                        <th className="border border-gray-300 p-3">Stopa razlike u cijeni</th>
                        <th className="border border-gray-300 p-3">Iznos razlike u cijeni</th>
                        <th className="border border-gray-300 p-3">Prodajna vrijednost proizvoda bez PDV-a</th>
                        <th className="border border-gray-300 p-3">Stopa PDV-a</th>
                        <th className="border border-gray-300 p-3">Iznos PDV-a</th>
                        <th className="border border-gray-300 p-3">Maloprodajna vrijednost sa PDV-om</th>
                        <th className="border border-gray-300 p-3">Maloprodajna cijena sa PDV-om</th>
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
            ) : (
                <p>Nemate unesenih artikala.</p>
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
        {isContentVisible && (
            <div className="mt-4">
                <PdfContent ref={contentRef} artikli={artikli} aktivniPdv={aktivniPdv} roundTo={roundTo}
                            naziv={naziv}
                            brojDokumenta={redniBroj}
                            dobavljac={kupciDobavljaci.find((dobavljac) => dobavljac.id == dobavljacId)?.name}/>
            </div>
        )}

        <button
            type="button"
            onClick={handleGeneratePDF}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">Generiši
            PDF
        </button>
        <button
            type="button"
            onClick={handlePrint}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">Pregledaj
            PDF
        </button>
        <button
            type="button"
            onClick={handleToggleContent}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            {isContentVisible ? 'Hide PDF Content' : 'Show PDF Content'}
        </button>

        <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
            {drawerContent === "artikli" && <ArtikliForm/>}
        </Drawer>

        {/*{isContentVisible && (*/}
        {/*    <div ref={contentRef} className="pdf-content">*/}
        {/*        <PdfContent*/}
        {/*            aktivniPdv={aktivniPdv}*/}
        {/*            roundTo={roundTo}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*)}*/}
    </>
);

export default UlaznaKalkulacija;