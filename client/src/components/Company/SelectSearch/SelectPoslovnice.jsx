import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SelectPoslovnice = ({ poslovnice, setPoslovnicaId, openDrawer }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const poslovniceOptions = poslovnice.map((poslovnica) => ({
            value: poslovnica.id,
            label: poslovnica.naziv,
        }));

        // Dodaj opciju "Create" ako unos ne postoji u opcijama
        if (
            inputValue &&
            !poslovniceOptions.some(
                (option) => option.label.toLowerCase() === inputValue.toLowerCase()
            )
        ) {
            poslovniceOptions.push({
                label: `Create "${inputValue}"`,
                value: "create",
                isCreateOption: true,
            });
        }

        setOptions(poslovniceOptions);
    }, [inputValue, poslovnice]);

    const handleSelectChange = (selectedOption) => {
        if (selectedOption?.isCreateOption) {
            openDrawer("poslovnice");
            console.log('Create new poslovnica with name:', inputValue);
        } else {
            setPoslovnicaId(
                selectedOption
                    ? selectedOption.value
                    : ""
            );
        }
    };

    return (
        <Select
            options={options}
            onInputChange={(value) => setInputValue(value)}
            onChange={handleSelectChange}
            placeholder='Odaberite poslovnicu'
            className='w-72 h-9 rounded-sm'
        />
    );
};

export default SelectPoslovnice;
