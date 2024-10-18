import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditMode } from "../../../features/editModeSlice.js";

const HandleAddArtiklNivelacija = ({
                             odabraniArtikl,
                             kolicina,
                             cijena,
                             mpcijena,
                             artikli,
                             setArtikli,
                             setOdabraniArtikl,
                             setKolicina,
                             setCijena,
                             setMpCijena,
                             editIndex,
                             setEditIndex,
                             dokumentId,
                                       novaCijena,
                                       setNovaCijena
                         }) => {
    const dispatch = useDispatch();
    const editMode = useSelector((state) => state.editMode.editMode);

    const handleAddArtikl = () => {
        if (odabraniArtikl && kolicina > 0) {
            const artiklZaDodavanje = {
                dokumentId,
                artikliId: odabraniArtikl.id,
                kolicina: parseFloat(kolicina),
                staraCijena: parseFloat(cijena),
                mpcijena: parseFloat(novaCijena),
                artikli: {
                    id: odabraniArtikl.artikli.id,
                    naziv: odabraniArtikl.artikli.naziv,
                    sifra: odabraniArtikl.artikli.sifra,
                },
            };

            if (editMode) {
                const updatedArtikli = artikli.map((item, index) =>
                    index === editIndex ? artiklZaDodavanje : item
                );
                setArtikli(updatedArtikli);
                dispatch(setEditMode(false)); // Promijeni editMode na false nakon završetka uređivanja
                setEditIndex(null);
            } else {
                setArtikli([...artikli, artiklZaDodavanje]);
            }

            // Resetovanje stanja nakon dodavanja ili uređivanja
            setOdabraniArtikl(null);
            setKolicina(0);
            setCijena(0);
            setMpCijena(0);
            setNovaCijena(0); // Resetovanje nove cijene
        }
    };

    return (
        <button
            type='button'
            onClick={handleAddArtikl}
            className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg'
        >
            {editMode ? "Spremi" : "Dodaj"}
        </button>
    );
};

export default HandleAddArtiklNivelacija;
