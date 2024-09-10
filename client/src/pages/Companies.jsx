import { Route, Routes } from "react-router-dom";
import CompanyDetail from "../components/Company/CompanyDetail";
import CompanySidebar from "../components/Company/companySidebar";
import CompanyHome from "../components/Company/CompanyHome";
import Dashboard from "../components/Company/Dashboard";
import {UnosRobe} from "../components/Company/KreirajDokumente/UnosRobe.jsx";
import {Sifrarnik} from "../components/Company/Sifrarnik.jsx";
import {ListaDokumenata} from "../components/Company/ListaDokumenata.jsx";
import {Navbar} from "../components/Navbar.jsx";
import {useState} from "react";


const Companies = () => {
  const [pageTitle, setPageTitle] = useState("Company Navbar");

  return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar on the left */}
        <CompanySidebar setPageTitle={setPageTitle}/>

        <div className="flex flex-col w-full">
          {/* Navbar at the top, adjusted for sidebar width */}
          <Navbar title={pageTitle} />

          {/* Main content area */}
          <div className="p-4">
            <CompanyDetail />
            <Routes>
              <Route path="home" element={<CompanyHome />} />
              <Route path="unosRobe" element={<UnosRobe />} />
              <Route path="dashboard/*" element={<Dashboard />} allowedRoles={[1, 3]} />
              <Route path="sifrarnik/*" element={<Sifrarnik />} />
              <Route path="listaDokumenata/*" element={<ListaDokumenata />} />
            </Routes>
          </div>
        </div>
      </div>
  );
};
export default Companies;
