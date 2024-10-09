import React, { useState, useEffect } from "react";
import Select from "react-select";
import {useSelector} from "react-redux";

const SelectPoslovnice = ({
  poslovnice,
  poslovniceId,
  setPoslovnicaId,
  openDrawer,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const userPoslovnicaId = useSelector((state) => state.auth.user.poslovniceId)

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

  useEffect(() => {
    // Ako korisnik ima vezanu poslovnicu, automatski je postavi
    if (userPoslovnicaId) {
      setPoslovnicaId(userPoslovnicaId);
    }
  }, [userPoslovnicaId, setPoslovnicaId]);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption?.isCreateOption) {
      openDrawer("poslovnice");
      console.log("Create new poslovnica with name:", inputValue);
    } else {
      setPoslovnicaId(selectedOption ? selectedOption.value : "");
    }
  };
  const isBusinessSelected = !!userPoslovnicaId;
// Pronađite poslovnicu na osnovu userPoslovnicaId
  const selectedBusiness = poslovnice.find((poslovnica) => poslovnica.id === userPoslovnicaId);

  return (
      <Select
          value={
            isBusinessSelected
                ? {
                  value: userPoslovnicaId,
                  label: selectedBusiness ? selectedBusiness.naziv : "Nepoznata poslovnica", // Proverite da li je poslovnica pronađena
                }
                : poslovnice.find((poslovnica) => poslovnica.id === poslovniceId)
                    ? {
                      value: poslovniceId,
                      label: poslovnice.find(
                          (poslovnica) => poslovnica.id === poslovniceId
                      ).naziv,
                    }
                    : null
          }
          options={isBusinessSelected ? [{ value: userPoslovnicaId, label: selectedBusiness ? selectedBusiness.naziv : "Nepoznata poslovnica" }] : options}
          onInputChange={(value) => setInputValue(value)}
          onChange={handleSelectChange}
          placeholder='Odaberite poslovnicu'
          className='w-72 h-9 rounded-sm'
          isDisabled={isBusinessSelected} // Onemogućava izbor ako je poslovnica postavljena
      />
  );
};
export default SelectPoslovnice;
