import { useState, useEffect } from 'react';
import Select from 'react-select';

const SelectNacinPlacanja = ({ nacinPlacanja, setNacinPlacanjaId, nacinPlacanjaId, openDrawer }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const nacinPlacanjaOptions = nacinPlacanja.map((nacinPlacanja) => ({
            value: nacinPlacanja.id,
            label: nacinPlacanja.naziv,
        }));

        // Dodaj opciju "Create" ako unos ne postoji u opcijama
        if (
            inputValue &&
            !nacinPlacanjaOptions.some(
                (option) => option.label.toLowerCase() === inputValue.toLowerCase()
            )
        ) {
            nacinPlacanjaOptions.push({
                label: `Create "${inputValue}"`,
                value: "create",
                isCreateOption: true,
            });
        }

        setOptions(nacinPlacanjaOptions);
    }, [inputValue, nacinPlacanja]);

    const handleSelectChange = (selectedOption) => {
        if (selectedOption?.isCreateOption) {
            openDrawer("nacinPlacanja");
            console.log('Create new nacinPlacanja with name:', inputValue);
        } else {
            setNacinPlacanjaId(
                selectedOption
                    ? selectedOption.value
                    : ""
            );
        }
    };

    return (
        <Select
            value={
                nacinPlacanja.find((nacinPlacanja) => nacinPlacanja.id === nacinPlacanjaId)
                    ? {
                        value: nacinPlacanjaId,
                        label: nacinPlacanja.find((nacinPlacanja) => nacinPlacanja.id === nacinPlacanjaId).naziv,
                    }
                    : null
            }
            options={options}
            onInputChange={(value) => setInputValue(value)}
            onChange={handleSelectChange}
            placeholder='Odaberite nacin placanja'
            className='w-72 h-9 rounded-sm'
        />
    );
};

export default SelectNacinPlacanja;
