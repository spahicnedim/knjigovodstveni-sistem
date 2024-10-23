import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';

// Lazy load komponenti
const UpdateCompany = lazy(() => import("./UpdateCompany"));
const AssignRadnici = lazy(() => import("./AssignRadici.jsx"));
const CreateRadnici = lazy(() => import("./CreateRadnici"));
const KupacDobavljac = lazy(() => import("./KupacDobavljac.jsx"));

const Dashboard = () => {
  return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
                path='dodaj-firmu'
                element={<UpdateCompany />}
                allowedRoles={[1, 3]}
            />
            <Route
                path='dodaj-kupacDobavljac'
                element={<KupacDobavljac />}
                allowedRoles={[1, 3]}
            />
            <Route
                path='prava-zaposlenih'
                element={<AssignRadnici />}
                allowedRoles={[1, 3]}
            />
            <Route
                path='dodaj-radnika'
                element={<CreateRadnici />}
                allowedRoles={[1, 3]}
            />
          </Routes>
        </Suspense>
      </div>
  );
};

export default Dashboard;
