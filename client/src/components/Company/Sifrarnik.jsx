import {Route, Routes} from "react-router-dom";
import UpdateCompany from "./UpdateCompany.jsx";
import KupacDobavljac from "./KupacDobavljac.jsx";
import AssignRadnici from "./AssignRadici.jsx";
import CreateRadnici from "./CreateRadnici.jsx";
import {Skladiste} from "./Skladiste.jsx";

export const Sifrarnik = () => {
    return (
        <div>
            <Routes>
                <Route
                    path='skladiste'
                    element={<Skladiste />}
                />

            </Routes>
        </div>
    );
}