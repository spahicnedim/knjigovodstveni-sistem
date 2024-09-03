import { Route, Routes } from "react-router-dom";
import CompanyDetail from "../components/Company/CompanyDetail";
import CompanySidebar from "../components/Company/companySidebar";
import CompanyHome from "../components/Company/CompanyHome";
import Dashboard from "../components/Company/Dashboard";
import {UnosRobe} from "../components/Company/KreirajDokumente/UnosRobe.jsx";
import {Sifrarnik} from "../components/Company/Sifrarnik.jsx";
import {ListaDokumenata} from "../components/Company/ListaDokumenata.jsx";

const Companies = () => {
  return (
    <div className='flex'>
      <CompanySidebar />
      <div className='flex-1 p-4 '>
        <CompanyDetail />
        <Routes>
          <Route path='home' element={<CompanyHome />} />
            <Route path='unosRobe' element={<UnosRobe />} />
          <Route
            path='dashboard/*'
            element={<Dashboard />}
            allowedRoles={[1, 3]}
          />
            <Route
                path='sifrarnik/*'
                element={<Sifrarnik />}
            />
            <Route
                path='listaDokumenata/*'
                element={<ListaDokumenata />}
            />
        </Routes>
      </div>
    </div>
  );
};

export default Companies;
