import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CompanyDetail from "../components/Company/CompanyDetail";
import CompanySidebar from "../components/Company/companySidebar";
import CompanyHome from "../components/Company/CompanyHome";
import Dashboard from "../components/Company/Dashboard";

const Companies = () => {
  return (
    <div className='flex'>
      <CompanySidebar />
      <div className='flex-1 p-4 '>
        <CompanyDetail />
        <Routes>
          <Route path='home' element={<CompanyHome />} />
          <Route
            path='dashboard/*'
            element={<Dashboard />}
            allowedRoles={[1, 3]}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Companies;
