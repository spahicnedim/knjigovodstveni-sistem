import {Route, Routes} from "react-router-dom";
import {MaloprodajnaKalukacija} from "./MaloprodajnaKalukacija.jsx";

export function ListaDokumenata() {
    return (
        <div>
            <Routes>
                <Route
                    path='maloprodajna-kalkulacija'
                    element={<MaloprodajnaKalukacija/>}
                />

            </Routes>
        </div>
    )
}