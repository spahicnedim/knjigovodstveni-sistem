import {useState, useEffect, lazy, Suspense} from "react";
import Select from "react-select";
const Drawer = lazy(() => import("../../Drawer.jsx"));
const KupciDobavljaciForm = lazy(() => import("../Forme/KupciDobavljaci.jsx"));

const SelectDobavljaci = ({
  kupciDobavljaci,
  dobavljacId,
  setDobavljacId,
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
      console.log("Create new dobavljač with name:", inputValue);
    } else {
      setDobavljacId(selectedOption ? selectedOption.value : "");
    }
  };

  return (
      <>
          <Select
              value={
                  kupciDobavljaci.find(
                      (kupacDobavljac) => kupacDobavljac.id === dobavljacId
                  )
                      ? {
                          value: dobavljacId,
                          label: kupciDobavljaci.find(
                              (kupacDobavljac) => kupacDobavljac.id === dobavljacId
                          ).name,
                      }
                      : null
              }
              options={options}
              onInputChange={(value) => setInputValue(value)}
              onChange={handleSelectChange}
              placeholder='Odaberite dobavljača'
              className='w-72 h-9 rounded-sm'
          />
            <Suspense>
                <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
                    {drawerContent === "dobavljaci" && (
                        <Suspense>
                            <KupciDobavljaciForm />
                        </Suspense>

                    )}
                </Drawer>
            </Suspense>

      </>

  );
};

export default SelectDobavljaci;
