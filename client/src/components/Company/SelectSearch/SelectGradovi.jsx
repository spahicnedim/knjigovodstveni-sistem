import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SelectGradovi = ({ gradoviList, sjedisteId, setSjedisteId, openDrawer }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Mapiranje gradova u odgovarajuće opcije
        const gradoviOptions = gradoviList.map((grad) => ({
            value: grad.id,
            label: grad.naziv,
        }));

        // Dodaj opciju "Create" ako unos ne postoji u opcijama
        if (
            inputValue &&
            !gradoviOptions.some(
                (option) => option.label.toLowerCase() === inputValue.toLowerCase()
            )
        ) {
            gradoviOptions.push({
                label: `Create "${inputValue}"`,
                value: "create",
                isCreateOption: true,
            });
        }

        setOptions(gradoviOptions);
    }, [inputValue, gradoviList]);

    const handleSelectChange = (selectedOption) => {
        if (selectedOption?.isCreateOption) {
            openDrawer("city");
        } else {
            setSjedisteId(selectedOption ? selectedOption.value : null);
        }
    };

    return (
        <Select
            options={options}
            value={
                gradoviList.find((grad) => grad.id === sjedisteId)
                    ? {
                        value: sjedisteId,
                        label: gradoviList.find((grad) => grad.id === sjedisteId).naziv,
                    }
                    : null
            }
            onInputChange={(value) => setInputValue(value)}
            onChange={handleSelectChange}
            placeholder='Select City'
            className='w-72 h-9 pl-2 rounded-sm'
        />
    );
};

export default SelectGradovi;