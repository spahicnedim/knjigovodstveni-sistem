import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SelectDobavljaci = ({ kupciDobavljaci, setDobavljacId, openDrawer }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const dobavljaciOptions = kupciDobavljaci
            .filter((dobavljac) => dobavljac.dobavljac)
            .map((dobavljac) => ({
                value: dobavljac.id,
                label: dobavljac.name,
            }));

        // Dodaj opciju "Create" ako unos ne postoji u opcijama
        if (
            inputValue &&
            !dobavljaciOptions.some(
                (option) => option.label.toLowerCase() === inputValue.toLowerCase()
            )
        ) {
            dobavljaciOptions.push({
                label: `Create "${inputValue}"`,
                value: "create",
                isCreateOption: true,
            });
        }

        setOptions(dobavljaciOptions);
    }, [inputValue, kupciDobavljaci]);

    const handleSelectChange = (selectedOption) => {
        if (selectedOption?.isCreateOption) {
            openDrawer("dobavljaci");
            console.log('Create new dobavljač with name:', inputValue);
        } else {
            setDobavljacId(
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
            placeholder='Odaberite dobavljača'
            className='w-72 h-9 rounded-sm'
        />
    );
};

export default SelectDobavljaci;