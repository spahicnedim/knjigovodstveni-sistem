import {Route, Routes} from "react-router-dom";
import {Skladiste} from "./Skladiste.jsx";
import {Poslovnica} from "./Poslovnica.jsx";
import {ArtikliForm} from "./Forme/ArtikliForm.jsx";

export const Sifrarnik = () => {
    return (
        <div>
            <Routes>
                <Route
                    path='skladiste'
                    element={<Skladiste />}
                />

            </Routes>
            <Routes>
                <Route
                    path='poslovnica'
                    element={<Poslovnica />}
                />

            </Routes>
            <Routes>
                <Route
                    path='artikli'
                    element={<ArtikliForm />}
                />

            </Routes>
        </div>
    );
}