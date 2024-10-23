import React, {useState, useEffect, lazy, Suspense} from "react";
import Select from "react-select";
import {useSelector} from "react-redux";
const Drawer = lazy(() => import("../../Drawer.jsx"));
const Poslovnica = lazy(() => import( "../Poslovnica.jsx"));

const SelectPoslovnice = ({
                              poslovnice,
                              poslovniceId,
                              setPoslovnicaId,
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

    const userPoslovnicaId = useSelector((state) => state.auth.user.poslovniceId)

    useEffect(() => {
        const poslovniceOptions = poslovnice.map((poslovnica) => ({
            value: poslovnica.id,
            label: poslovnica.naziv,
        }));

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

    const selectedBusiness = poslovnice.find((poslovnica) => poslovnica.id === userPoslovnicaId);

    return (
        <>
            <Select
                value={
                    isBusinessSelected
                        ? {
                            value: userPoslovnicaId,
                            label: selectedBusiness ? selectedBusiness.naziv : "Nepoznata poslovnica",
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
                isDisabled={isBusinessSelected}
            />
            <Suspense>
                <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
                    {drawerContent === "poslovnice" && (
                        <Suspense>
                            <Poslovnica />
                        </Suspense>
                    )}
                </Drawer>
            </Suspense>

        </>

    );
};
export default SelectPoslovnice;