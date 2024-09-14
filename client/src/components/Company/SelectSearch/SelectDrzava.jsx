import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SelectDrzave = ({ drzaveList, drzavaId, setDrzavaId, openDrawer }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Mapiranje država u odgovarajuće opcije
        const drzaveOptions = drzaveList.map((drzava) => ({
            value: drzava.id,
            label: drzava.naziv,
        }));

        // Dodaj opciju "Create" ako unos ne postoji u opcijama
        if (
            inputValue &&
            !drzaveOptions.some(
                (option) => option.label.toLowerCase() === inputValue.toLowerCase()
            )
        ) {
            drzaveOptions.push({
                label: `Create "${inputValue}"`,
                value: "create",
                isCreateOption: true,
            });
        }

        setOptions(drzaveOptions);
    }, [inputValue, drzaveList]);

    const handleSelectChange = (selectedOption) => {
        if (selectedOption?.isCreateOption) {
            openDrawer("drzava");
        } else {
            setDrzavaId(selectedOption ? selectedOption.value : null);
        }
    };

    return (
        <Select
            options={options}
            value={
                drzaveList.find((drzava) => drzava.id === drzavaId)
                    ? {
                        value: drzavaId,
                        label: drzaveList.find((drzava) => drzava.id === drzavaId).naziv,
                    }
                    : null
            }
            onInputChange={(value) => setInputValue(value)}
            onChange={handleSelectChange}
            placeholder='Select Država'
            className='w-72 h-9 pl-2 rounded-sm'
        />
    );
};

export default SelectDrzave;