import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateCompany from "../components/CreateCompany";
import AssignEmployees from "../components/AssignEmployees";
import CreateEmployees from "../components/CreateEmployees";

const Dashboard = () => {
  return (
    <div>
      <Routes>
        <Route
          path='dodaj-firmu'
          element={<CreateCompany />}
          allowedRoles={[1, 3]}
        />
        <Route
          path='prava-zaposlenih'
          element={<AssignEmployees />}
          allowedRoles={[1, 3]}
        />
        <Route
          path='dodaj-zaposlenog'
          element={<CreateEmployees />}
          allowedRoles={[1, 3]}
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
