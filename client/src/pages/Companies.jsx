import { Route, Routes } from "react-router-dom";
import CompanyDetail from "../components/Company/CompanyDetail";
import CompanySidebar from "../components/Company/companySidebar";
import CompanyHome from "../components/Company/CompanyHome";
import Dashboard from "../components/Company/Dashboard";
import { KreirajDokumente } from "../components/Company/KreirajDokumente/KreirajDokumente.jsx";
import { Sifrarnik } from "../components/Company/Sifrarnik.jsx";
import { ListaDokumenata } from "../components/Company/VrsteDokumenata/ListaDokumenata.jsx";
import { EditMaloprodajnaKalkulacija } from "../components/Company/VrsteDokumenata/MaloprodajnaKalkulacija/EditMaloprodajnaKalkulacija.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import {
  fetchActiveGodina,
  fetchAllGodine,
} from "../features/godine/godineThunks.js";
import { useDispatch, useSelector } from "react-redux";
import {
  EditVeleprodajneKalkulacija
} from "../components/Company/VrsteDokumenata/VeleprodajnaKalkulacija/EditVeleprodajneKalkulacije.jsx";
import {Knjige} from "../components/Company/Knjige/Knjige.jsx";

const Companies = () => {
  const dispatch = useDispatch();
  const [pageTitle, setPageTitle] = useState("Company Navbar");

  const aktivnaGodina = useSelector((state) => state.godina.godina);

  useEffect(() => {
    dispatch(fetchActiveGodina());
  }, [dispatch]);

  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Sidebar na lijevoj strani */}
      <CompanySidebar setPageTitle={setPageTitle} />

      <div className='flex flex-col w-full'>
        {/* Navbar na vrhu, prilagođena za sidebar */}
        <Navbar title={pageTitle} aktivnaGodina={aktivnaGodina} />

        {/* Glavni sadržaj */}
        <div className='p-4'>
          <CompanyDetail />
          <Routes>
            <Route path='home' element={<CompanyHome />} />
            <Route path='unosRobe' element={<KreirajDokumente />} />
            <Route
              path='dashboard/*'
              element={<Dashboard />}
              allowedRoles={[1, 3]}
            />
            <Route path='sifrarnik/*' element={<Sifrarnik />} />
            <Route
              path='lista-dokumenata'
              element={<ListaDokumenata />}
            />
            <Route
              path='lista-dokumenata/MP/:dokumentId'
              element={<EditMaloprodajnaKalkulacija />}
            />
            <Route
                path='lista-dokumenata/VP/:dokumentId'
                element={<EditVeleprodajneKalkulacija />}
            />
            <Route
                path='knjige/*'
                element={<Knjige />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Companies;
