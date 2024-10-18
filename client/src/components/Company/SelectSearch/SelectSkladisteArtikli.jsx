import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Skladiste } from "../Skladiste.jsx";
import Drawer from "../../Drawer.jsx";
import { ArtikliForm } from "../Forme/ArtikliForm.jsx";

const SelectSkladisteArtikli = ({ artikliList, setOdabraniArtikl }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState("");

    const openDrawer = (content) => {
        setDrawerContent(content);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setDrawerContent(null);
    };

    useEffect(() => {
        // Kreiraj opcije za dropdown sa nazivom i cijenom artikla
        const artikliOptions = artikliList.map((artikl, index) => ({
            value: `${artikl.artikli.id}-${index}`, // Koristimo kombinaciju ID-a i indexa kako bi omogućili duplikate
            label: `${artikl.artikli.naziv} - MPC: ${artikl.cijena?.mpcijena}`,
            artikl: artikl, // Sačuvaj cijeli artikl objekat u opciji za kasnije korištenje
        }));

        // Dodaj opciju "Create" ako unos ne postoji u opcijama
        if (
            inputValue &&
            !artikliOptions.some(
                (option) => option.label.toLowerCase() === inputValue.toLowerCase()
            )
        ) {
            artikliOptions.push({
                label: `Create "${inputValue}"`,
                value: "create",
                isCreateOption: true,
            });
        }

        setOptions(artikliOptions);
    }, [inputValue, artikliList]);

    const handleSelectChange = (selectedOption) => {
        if (selectedOption?.isCreateOption) {
            openDrawer("artikli");
        } else {
            setOdabraniArtikl(selectedOption ? selectedOption.artikl : null);
        }
    };

    return (
        <>
            <Select
                options={options}
                onInputChange={(value) => setInputValue(value)}
                onChange={handleSelectChange}
                placeholder='Odaberite artikl ili unesite novi'
                className='w-80 h-9 p-2 rounded-sm mb-3.5'
            />
            <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
                {drawerContent === "artikli" && (
                    <ArtikliForm />
                )}
            </Drawer>
        </>
    );
};

export default SelectSkladisteArtikli;
