import React, { useState, useEffect } from "react";
import Select from "react-select";

const SelectSkladista = ({
  filteredSkladista,
  skladisteId,
  setSkladisteId,
  openDrawer,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const skladistaOptions = filteredSkladista.map((skladiste) => ({
      value: skladiste.id,
      label: skladiste.naziv,
    }));

    // Dodaj opciju "Create" ako unos ne postoji u opcijama
    if (
      inputValue &&
      !skladistaOptions.some(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
      )
    ) {
      skladistaOptions.push({
        label: `Create "${inputValue}"`,
        value: "create",
        isCreateOption: true,
      });
    }

    setOptions(skladistaOptions);
  }, [inputValue, filteredSkladista]);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption?.isCreateOption) {
      openDrawer("skladista");
      console.log("Create new skladište with name:", inputValue);
    } else {
      setSkladisteId(selectedOption ? selectedOption.value : "");
    }
  };

  return (
    <Select
      value={
        filteredSkladista.find((skladista) => skladista.id === skladisteId)
          ? {
              value: skladisteId,
              label: filteredSkladista.find(
                (skladista) => skladista.id === skladisteId
              ).naziv,
            }
          : null
      }
      options={options}
      onInputChange={(value) => setInputValue(value)}
      onChange={handleSelectChange}
      placeholder='Odaberite skladište'
      className='w-72 h-9 rounded-sm'
    />
  );
};

export default SelectSkladista;
