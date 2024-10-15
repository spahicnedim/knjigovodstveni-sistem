import React, { useState, useEffect } from "react";
import Select from "react-select";
import Drawer from "../../Drawer.jsx";
import {Poslovnica} from "../Poslovnica.jsx";
import {Skladiste} from "../Skladiste.jsx";

const SelectSkladista = ({
  filteredSkladista,
  skladisteId,
  setSkladisteId,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");

  const openDrawer = (content) => {
    setDrawerContent(content);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerContent(null);
  };

  useEffect(() => {
    const skladistaOptions = filteredSkladista.map((skladiste) => ({
      value: skladiste.id,
      label: skladiste.naziv,
    }));

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
      <>
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
        <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
          {drawerContent === "skladista" && (
              <Skladiste />
          )}
        </Drawer>
      </>

  );
};

export default SelectSkladista;
