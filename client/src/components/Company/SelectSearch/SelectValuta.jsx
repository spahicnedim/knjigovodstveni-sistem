import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SelectValute = ({ valute, setValutaId, openDrawer }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const valuteOptions = valute.map((valuta) => ({
            value: valuta.id,
            label: valuta.naziv,
        }));

        // Dodaj opciju "Create" ako unos ne postoji u opcijama
        if (
            inputValue &&
            !valuteOptions.some(
                (option) => option.label.toLowerCase() === inputValue.toLowerCase()
            )
        ) {
            valuteOptions.push({
                label: `Create "${inputValue}"`,
                value: "create",
                isCreateOption: true,
            });
        }

        setOptions(valuteOptions);
    }, [inputValue, valute]);

    const handleSelectChange = (selectedOption) => {
        if (selectedOption?.isCreateOption) {
            openDrawer("valute");
            console.log('Create new valuta with name:', inputValue);
        } else {
            setValutaId(
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
            placeholder='Odaberite valutu'
            className='w-72 h-9 rounded-sm'
        />
    );
};

export default SelectValute;
