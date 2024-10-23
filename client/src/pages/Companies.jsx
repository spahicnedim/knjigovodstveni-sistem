import { useEffect, Suspense, lazy } from "react";
// const CompanyDetail = lazy(() => import("../components/Company/CompanyDetail"));
// const CompanySidebar = lazy(() => import("../components/Company/companySidebar"));
// const CompanyHome = lazy(() => import("../components/Company/CompanyHome"));
// const Dashboard = lazy(() => import("../components/Company/Dashboard"));
// const KreirajDokumente = lazy(() => import("../components/Company/KreirajDokumente/KreirajDokumente.jsx"));
// const Sifrarnik = lazy(() => import("../components/Company/Sifrarnik.jsx"));
// const ListaDokumenata = lazy(() => import("../components/Company/VrsteDokumenata/ListaDokumenata.jsx"));
// const EditMaloprodajnaKalkulacija = lazy(() => import("../components/Company/VrsteDokumenata/MaloprodajnaKalkulacija/EditMaloprodajnaKalkulacija.jsx"));
// const Navbar = lazy(() => import("../components/Navbar.jsx"));
// const EditVeleprodajneKalkulacija = lazy(() => import("../components/Company/VrsteDokumenata/VeleprodajnaKalkulacija/EditVeleprodajneKalkulacije.jsx"));
// const Knjige = lazy(() => import("../components/Company/Knjige/Knjige.jsx"));
// const EditIzlazneFakture = lazy(() => import("../components/Company/VrsteDokumenata/IzlaznaFaktura/EditIzlazneFakture.jsx"));
// const POSKasa = lazy(() => import("../components/Company/POSKasa.jsx"));
// import { useEffect } from "react";
// import {
//   fetchActiveGodina,
// } from "../features/godine/godineThunks.js";
// import { useDispatch, useSelector } from "react-redux";
import {Route, Routes, useParams} from "react-router-dom";
 const CompanyDetail = lazy(() => import("../components/Company/CompanyDetail"));
const CompanySidebar = lazy(() => import("../components/Company/companySidebar"));
const CompanyHome = lazy(() => import("../components/Company/CompanyHome"));
const Dashboard = lazy(() => import("../components/Company/Dashboard"));
const KreirajDokumente = lazy(() => import("../components/Company/KreirajDokumente/KreirajDokumente.jsx"));
const Sifrarnik = lazy(() => import("../components/Company/Sifrarnik.jsx"));
const ListaDokumenata = lazy(() => import("../components/Company/VrsteDokumenata/ListaDokumenata.jsx"));
const EditMaloprodajnaKalkulacija = lazy(() => import("../components/Company/VrsteDokumenata/MaloprodajnaKalkulacija/EditMaloprodajnaKalkulacija.jsx"));
const Navbar = lazy(() => import("../components/Navbar.jsx"));
import {
    fetchActiveGodina,
} from "../features/godine/godineThunks.js";
import { useDispatch, useSelector } from "react-redux";
const EditVeleprodajneKalkulacija = lazy(() => import("../components/Company/VrsteDokumenata/VeleprodajnaKalkulacija/EditVeleprodajneKalkulacije.jsx"));
const Knjige = lazy(() => import("../components/Company/Knjige/Knjige.jsx"));
const EditIzlazneFakture = lazy(() => import("../components/Company/VrsteDokumenata/IzlaznaFaktura/EditIzlazneFakture.jsx"));
 const POSKasa = lazy(() => import("../components/Company/POSKasa.jsx"));


const Companies = () => {
  const dispatch = useDispatch();

  const aktivnaGodina = useSelector((state) => state.godina.godina);
   const {companyId} = useParams();

  useEffect(() => {
      if(companyId){
          dispatch(fetchActiveGodina());
      }
  }, [dispatch, companyId]);
  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Sidebar na lijevoj strani */}
        <Suspense>
            <CompanySidebar />
        </Suspense>



      <div className='flex flex-col w-full'>
        {/* Navbar na vrhu, prilagođena za sidebar */}
            <Suspense>
                <Navbar aktivnaGodina={aktivnaGodina} />
            </Suspense>



        {/* Glavni sadržaj */}
        <div className='p-4'>
            <Suspense>
                <CompanyDetail />
            </Suspense>

          <Routes>
            <Route path='home' element={
                <Suspense>
                    <CompanyHome />
                </Suspense>
                }
            />
            <Route path='unosRobe' element={
                <Suspense fallback={<div>Kreiraj dokument...</div>}>
                    <KreirajDokumente />
                </Suspense>

            }
            />
            <Route path='dashboard/*' element={
                <Suspense>
                    <Dashboard />
                </Suspense>

              }
            />
            <Route path='sifrarnik/*' element={
                <Suspense>
                    <Sifrarnik />
                </Suspense>

             }
            />
            <Route path='lista-dokumenata' element={
                <Suspense>
                    <ListaDokumenata />
                </Suspense>

              }
            />
            <Route path='lista-dokumenata/MP/:dokumentId' element={
                <Suspense>
                    <EditMaloprodajnaKalkulacija />
                </Suspense>
              }
            />
            <Route path='lista-dokumenata/VP/:dokumentId' element={
                <Suspense>
                    <EditVeleprodajneKalkulacija />
                </Suspense>

             }
            />
            <Route path='lista-dokumenata/izlazna-faktura/:dokumentId' element={
                <Suspense>
                    <EditIzlazneFakture />
                </Suspense>

             }
            />
            <Route path='knjige/*' element={
                <Suspense>
                    <Knjige />
                </Suspense>

             }
            />
            <Route path='kasa/' element={
                <Suspense>
                    <POSKasa />
                </Suspense>

              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Companies;