import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load komponente
const CreateCompany = lazy(() => import("./CreateCompany"));
const AssignEmployees = lazy(() => import("./AssignEmployees"));
const CreateEmployees = lazy(() => import("./CreateEmployees"));

const Dashboard = () => {
  return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
                path="dodaj-firmu"
                element={<CreateCompany />}
                allowedRoles={[1, 3]}
            />
            <Route
                path="prava-zaposlenih"
                element={<AssignEmployees />}
                allowedRoles={[1, 3]}
            />
            <Route
                path="dodaj-zaposlenog"
                element={<CreateEmployees />}
                allowedRoles={[1, 3]}
            />
          </Routes>
        </Suspense>
      </div>
  );
};

export default Dashboard;
