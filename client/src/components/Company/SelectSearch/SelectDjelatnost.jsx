import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SelectDjelatnost = ({ djelatnosti, djelatnostId ,setDjelatnostId, openDrawer }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Mapiraj postojeće djelatnosti u odgovarajuće opcije za Select
        const djelatnostiOptions = djelatnosti.map((djelatnost) => ({
            value: djelatnost.id,
            label: djelatnost.naziv,
        }));

        // Ako unesena djelatnost ne postoji, dodaj opciju za kreiranje
        if (
            inputValue &&
            !djelatnostiOptions.some(
                (option) => option.label.toLowerCase() === inputValue.toLowerCase()
            )
        ) {
            djelatnostiOptions.push({
                label: `Create "${inputValue}"`,
                value: "create",
                isCreateOption: true,
            });
        }

        setOptions(djelatnostiOptions);
    }, [inputValue, djelatnosti]);

    const handleSelectChange = (selectedOption) => {
        if (selectedOption?.isCreateOption) {
            // Otvori Drawer za kreiranje nove djelatnosti
            openDrawer("djelatnost");
            console.log('Create new djelatnost with name:', inputValue);
        } else {
            // Postavi odabranu djelatnost
            setDjelatnostId(selectedOption ? selectedOption.value : null);
        }

        // Resetuj input nakon odabira
        setInputValue("");
    };

    return (
        <Select
            options={options} // Prikazivanje opcija
            onInputChange={(value) => setInputValue(value)} // Ažuriranje unosa
            onChange={handleSelectChange} // Reagovanje na odabir
                value={
                    djelatnosti.find((djelatnost) => djelatnost.id === djelatnostId)
                        ? {
                            value: djelatnostId,
                            label: djelatnosti.find((djelatnost) => djelatnost.id === djelatnostId).naziv,
                        }
                        : null
                }
            placeholder='Select Djelatnost'
            className='w-72 h-9 rounded-sm'
        />
    );
};

export default SelectDjelatnost;