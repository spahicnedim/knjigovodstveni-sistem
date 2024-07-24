import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateCompany from "../components/CreateCompany";
import AssignEmployees from "../components/AssignEmployees";
import CreateEmployees from "../components/CreateEmployees";

const Dashboard = () => {
  return (
    <div>
      <Routes>
        <Route path='dodaj-firmu' element={<CreateCompany />} />
        <Route path='prava-zaposlenih' element={<AssignEmployees />} />
        <Route path='dodaj-zaposlenog' element={<CreateEmployees />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
