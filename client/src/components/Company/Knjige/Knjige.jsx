import {Route, Routes} from "react-router-dom";
import {KUF} from "./KUF.jsx";


export const Knjige = () => {
    return (
        <div>
            <Routes>
                <Route
                    path='KUF/:knjigeId'
                    element={<KUF />}
                />

            </Routes>
            <Routes>
                <Route
                    path='KIF'
                />

            </Routes>
        </div>
    );
}