import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SelectArtikli = ({ artikliList, openDrawer, setOdabraniArtikl }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const artikliOptions = artikliList.map((artikl) => ({
            value: artikl.id,
            label: artikl.naziv,
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
            setOdabraniArtikl(
                selectedOption
                    ? artikliList.find((artikl) => artikl.id === selectedOption.value)
                    : null
            );
        }
    };

    return (
        <Select
            options={options}
            onInputChange={(value) => setInputValue(value)}
            onChange={handleSelectChange}
            placeholder='Odaberite artikl ili unesite novi'
            className='w-80 h-9 p-2 rounded-sm mb-3.5'
        />
    );
};

export default SelectArtikli;
