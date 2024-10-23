import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load komponente
const Skladiste = lazy(() => import("./Skladiste.jsx"));
const Poslovnica = lazy(() => import("./Poslovnica.jsx"));
const ArtikliForm = lazy(() => import("./Forme/ArtikliForm.jsx"));

export const Sifrarnik = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading skladiste...</div>}>
                <Routes>
                    <Route path="skladiste" element={<Skladiste />} />
                </Routes>
            </Suspense>

            <Suspense fallback={<div>Loading poslovnica...</div>}>
                <Routes>
                    <Route path="poslovnica" element={<Poslovnica />} />
                </Routes>
            </Suspense>

            <Suspense fallback={<div>Loading artikli form...</div>}>
                <Routes>
                    <Route path="artikli" element={<ArtikliForm />} />
                </Routes>
            </Suspense>
        </div>
    );
};
