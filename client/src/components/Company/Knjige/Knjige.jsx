import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load komponente
const KUF = lazy(() => import("./KUF.jsx"));
const KIF = lazy(() => import("./KIF.jsx"));

const Knjige = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading KUF...</div>}>
                <Routes>
                    <Route path="KUF/:knjigeId" element={<KUF />} />
                </Routes>
            </Suspense>

            <Suspense fallback={<div>Loading KIF...</div>}>
                <Routes>
                    <Route path="KIF/:knjigeId" element={<KIF />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default Knjige;