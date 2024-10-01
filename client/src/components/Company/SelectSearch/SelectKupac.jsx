import React, { useState, useEffect } from "react";
import Select from "react-select";

const SelectDobavljaci = ({
                              kupciDobavljaci,
                              kupacId,
                              setKupacId,
                              openDrawer,
                          }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const kupciOptions = kupciDobavljaci
            .filter((kupac) => kupac.kupac)
            .map((kupac) => ({
                value: kupac.id,
                label: kupac.name,
            }));

        // Dodaj opciju "Create" ako unos ne postoji u opcijama
        if (
            inputValue &&
            !kupciOptions.some(
                (option) => option.label.toLowerCase() === inputValue.toLowerCase()
            )
        ) {
            kupciOptions.push({
                label: `Create "${inputValue}"`,
                value: "create",
                isCreateOption: true,
            });
        }

        setOptions(kupciOptions);
    }, [inputValue, kupciDobavljaci]);

    const handleSelectChange = (selectedOption) => {
        if (selectedOption?.isCreateOption) {
            openDrawer("dobavljaci");
            console.log("Create new kupac with name:", inputValue);
        } else {
            setKupacId(selectedOption ? selectedOption.value : "");
        }
    };

    return (
        <Select
            value={
                kupciDobavljaci.find(
                    (kupacDobavljac) => kupacDobavljac.id === kupacId
                )
                    ? {
                        value: kupacId,
                        label: kupciDobavljaci.find(
                            (kupacDobavljac) => kupacDobavljac.id === kupacId
                        ).name,
                    }
                    : null
            }
            options={options}
            onInputChange={(value) => setInputValue(value)}
            onChange={handleSelectChange}
            placeholder='Odaberite kupca'
            className='w-72 h-9 rounded-sm'
        />
    );
};

export default SelectDobavljaci;
