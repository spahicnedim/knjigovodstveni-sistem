import React, {useState, useEffect, lazy, Suspense} from "react";
import Select from "react-select";
const Drawer = lazy(() => import("../../Drawer.jsx"));
const KupciDobavljaciForm = lazy(() => import("../Forme/KupciDobavljaci.jsx"));

const SelectDobavljaci = ({
                              kupciDobavljaci,
                              kupacId,
                              setKupacId,
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
        <>
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
