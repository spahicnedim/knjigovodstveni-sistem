import { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  updateCompany,
  fetchoneCompany,
  fetchCompanies,
} from "../../features/companies/companyThunks";
import {fetchGradovi} from "../../features/gradovi/gradThunk.js"
import {fetchDrzave} from "../../features/drzave/DrzavaThunk.js"
import {fetchBanke} from "../../features/banke/bankaThunk.js"
import { fetchServiceById } from "../../features/services/serviceThunk";
import { fetchUsers } from "../../features/users/userThunk";
import {
  createRacun,
  fetchRacuni,
  deleteRacun,
} from "../../features/racuni/racunThunk";

import io from "socket.io-client";
import { fetchDjelatnosti } from "../../features/djelatnost/djelatnostThunk";
import {fetchValuta} from "../../features/valute/valuteThunks.js";
import Drawer from "../Drawer";
import GradForm from "./Forme/CityForm.jsx";
import DrzavaForm from "./Forme/DrzavaForm.jsx";
import DjelatnostForm from "./Forme/DjelatnostForm.jsx";
import SelectGradovi from "./SelectSearch/SelectGradovi.jsx";
import SelectDrzava from "./SelectSearch/SelectDrzava.jsx";
import SelectValuta from "./SelectSearch/SelectValuta.jsx";
import SelectDjelatnost from "./SelectSearch/SelectDjelatnost.jsx";

const socket = io("http://localhost:3001");

const UpdateCompany = () => {
  const [name, setName] = useState("");
  const [adresa, setAdresa] = useState("");
  const [PDVbroj, setPDVbroj] = useState("");
  const [IDbroj, setIDbroj] = useState("");
  const [obveznikPDV, setObveznikPDV] = useState(false);
  const [telefon, setTelefon] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");
  const [sjedisteId, setSjedisteId] = useState(null);
  const [br_racuna, setBrRacuna] = useState("");
  const [devizni, setDevizni] = useState(false);
  const [drzavaId, setDrzavaId] = useState(null);
  const [nazivId, setNazivId] = useState(null);
  const [djelatnostId, setDjelatnostId] = useState(null);
  const [postalCode, setPostalCode] = useState("");
  const [sifraDjelatnosti, setSifraDjelatnosti] = useState(null);
  const [valutaId, setValutaId] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");

  const { serviceId, companyId } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.current);
  const user = useSelector((state) => state.auth.user);
  const gradovi = useSelector((state) => state.grad.gradovi);
  const company = useSelector((state) => state.company.current);
  const racuni = useSelector((state) => state.racun.racuni);
  const djelatnosti = useSelector((state) => state.djelatnost.djelatnosti);
  const drzave = useSelector((state) => state.drzava.drzave);
  const banke = useSelector((state) => state.banka.banke);
  const valute = useSelector((state) => state.valuta.valute)

  const openDrawer = (content) => {
    setDrawerContent(content);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerContent("");
  };

  useEffect(() => {
    if (serviceId) {
      dispatch(fetchServiceById(serviceId));
    }
  }, [user, serviceId, dispatch]);

  useEffect(() => {
    if (service.id) {
      dispatch(fetchCompanies(service.id));
      dispatch(fetchUsers(service.id));
      dispatch(fetchGradovi());
      dispatch(fetchDrzave());
      dispatch(fetchBanke());
      dispatch(fetchDjelatnosti());
      dispatch(fetchValuta())
    }
  }, [service, dispatch]);

  useEffect(() => {
    if (companyId) {
      dispatch(fetchoneCompany({ serviceId, companyId }));
      dispatch(fetchRacuni(companyId));
    }
  }, [companyId, dispatch]);

  useEffect(() => {
    if (company) {
      setName(company.name);
      setAdresa(company.adresa);
      setPDVbroj(company.PDVbroj);
      setIDbroj(company.IDbroj);
      setObveznikPDV(company.obveznikPDV);
      setTelefon(company.telefon);
      setFax(company.fax);
      setEmail(company.email);
      setWeb(company.web);
      setSjedisteId(Number(company.sjedisteId));
      setDrzavaId(Number(company.drzavaId));
      setDjelatnostId(Number(company.djelatnostId));
      setValutaId(Number(company.valutaId));
    }
  }, [company]);

  const handleCompanyUpdate = (e) => {
    e.preventDefault();
    const companyData = {
      name,
      adresa,
      sjedisteId,
      drzavaId,
      PDVbroj,
      IDbroj,
      djelatnostId,
      obveznikPDV,
      telefon,
      fax,
      email,
      web,
      valutaId
    };

    dispatch(updateCompany({ companyId, companyData }));
  };

  useEffect(() => {
    socket.on("racunCreated", (newRacun) => {
      dispatch(fetchRacuni(companyId));
    });

    socket.on("racunDeleted", (deletedRacun) => {
      dispatch(fetchRacuni(companyId));
    });

    return () => {
      socket.off("racunCreated");
      socket.off("racunDeleted");
    };
  }, [companyId, dispatch]);

  const handleBankDetailsCreate = (e) => {
    e.preventDefault();
    const racunData = {
      nazivId,
      br_racuna,
      devizni,
      companyId,
    };
    dispatch(createRacun(racunData));
  };

  const handleRacunDelete = (id) => {
    dispatch(deleteRacun(id));
  };

  useEffect(() => {
    if (sjedisteId) {
      const selectedGrad = gradovi.find((grad) => grad.id === sjedisteId);
      setPostalCode(selectedGrad ? selectedGrad.postanski_broj : "");
    } else {
      setPostalCode("");
    }
  }, [sjedisteId, gradovi]);

  useEffect(() => {
    if (djelatnostId) {
      const selectedDjelatnost = djelatnosti.find(
        (djelatnost) => djelatnost.id === djelatnostId
      );
      setSifraDjelatnosti(selectedDjelatnost ? selectedDjelatnost.sifra : "");
    } else {
      setPostalCode("");
    }
  }, [djelatnostId, djelatnosti]);

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-4 bg-white'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='p-4'>
          <h2 className='text-2xl font-bold mb-4'>Podaci o Firmi</h2>
          <form onSubmit={handleCompanyUpdate} className='space-y-4'>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>Naziv Firme</label>
              <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Company Name'
                  className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
              />
            </div>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>Adresa</label>
              <input
                  type='text'
                  value={adresa}
                  onChange={(e) => setAdresa(e.target.value)}
                  placeholder='Address'
                  className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
              />
            </div>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>Grad</label>
              <SelectGradovi
                  gradoviList={gradovi}
                  sjedisteId={sjedisteId}
                  setSjedisteId={setSjedisteId}
                  openDrawer={openDrawer}
              />
            </div>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>Postanski broj</label>
              <input
                  type='text'
                  value={postalCode}
                  readOnly
                  placeholder='Postal Code'
                  className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
              />
            </div>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>Drzava</label>
              <SelectDrzava
                  drzaveList={drzave}
                  drzavaId={drzavaId}
                  setDrzavaId={setDrzavaId}
                  openDrawer={openDrawer}
              />
            </div>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>PDV Broj</label>
              <input
                  type='text'
                  value={PDVbroj}
                  onChange={(e) => setPDVbroj(e.target.value)}
                  placeholder='PDV Number'
                  className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
              />
            </div>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>ID Broj</label>
              <input
                  type='text'
                  value={IDbroj}
                  onChange={(e) => setIDbroj(e.target.value)}
                  placeholder='ID Number'
                  className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
              />
            </div>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>Valuta</label>
              <SelectValuta
                  valute={valute}
                  setValutaId={setValutaId}
                  valutaId={valutaId}
                  openDrawer={openDrawer}
              />
            </div>
            <label className='flex items-center space-x-2'>
              <input
                  type='checkbox'
                  checked={obveznikPDV}
                  onChange={(e) => setObveznikPDV(e.target.checked)}
                  className='form-checkbox'
              />
              <span>Obveznik PDV</span>
            </label>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>Telefon</label>
              <input
                  type='text'
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  placeholder='Phone'
                  className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
              />
            </div>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>Fax</label>
              <input
                  type='text'
                  value={fax}
                  onChange={(e) => setFax(e.target.value)}
                  placeholder='Fax'
                  className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
              />
            </div>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>Email</label>
              <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
              />
            </div>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>Web</label>
              <input
                  type='text'
                  value={web}
                  onChange={(e) => setWeb(e.target.value)}
                  placeholder='Website'
                  className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
              />
            </div>

            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>Djelatnost</label>
              <SelectDjelatnost
                  djelatnosti={djelatnosti}
                  djelatnostId={djelatnostId}
                  setDjelatnostId={setDjelatnostId}
                  openDrawer={openDrawer}
              />
            </div>
            <div className='flex items-center  space-x-5 mb-6'>
              <label className='block text-gray-700 text-sm font-medium'>Djelatnost</label>
              <input
                  type='text'
                  value={sifraDjelatnosti}
                  readOnly
                  placeholder='Sifra djelatnosti'
                  className='w-72 h-9 pl-2 border border-gray-300 rounded-sm'
              />
            </div>

              <button
                  type='submit'
                  className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
              >
                Update Company
              </button>
          </form>
        </div>

        <div className=' p-4'>
          <h2 className='text-2xl font-bold mb-4'>Dodaj bankovni racun</h2>
          <form onSubmit={handleBankDetailsCreate} className='space-y-4'>
            <Select
              options={banke.map((banka) => ({
                value: banka.id,
                label: banka.naziv,
              }))}
              value={
                nazivId
                  ? {
                      value: nazivId,
                      label:
                        banke.find((banka) => banka.id === nazivId)?.naziv ||
                        "Select Banka",
                    }
                  : null
              }
              onChange={(selectedOption) =>
                setNazivId(selectedOption ? selectedOption.value : null)
              }
              placeholder='Select Banka'
              className=''
            />
            <input
              type='text'
              value={br_racuna}
              onChange={(e) => setBrRacuna(e.target.value)}
              placeholder='Account Number'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={devizni}
                onChange={(e) => setDevizni(e.target.checked)}
                className='form-checkbox'
              />
              <span>Devizni</span>
            </label>
            <button
              type='submit'
              className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600'
            >
              Create Bank Account
            </button>
          </form>

          {/* List of Bank Accounts */}
          <div className='mt-4'>
            <h3 className='text-xl font-bold'>Bankovni racuni</h3>
            <ul className='mt-2'>
              {racuni.map((racun) => {
                const banka = banke.find((b) => b.id === racun.nazivId);
                return (
                  <li
                    key={racun.id}
                    className='flex justify-between items-center p-2 border-b'
                  >
                    <span>
                      {banka
                        ? `${banka.naziv} - ${racun.br_racuna}`
                        : racun.br_racuna}{" "}
                    </span>

                    <span>Devizni: {racun.devizni ? "Da" : "No"}</span>

                    <button
                      onClick={() => handleRacunDelete(racun.id)}
                      className='text-red-500 hover:underline'
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        {drawerContent === "city" && <GradForm />}
        {drawerContent === "drzava" && <DrzavaForm />}
        {drawerContent === "djelatnost" && <DjelatnostForm />}
        {/* Other forms as needed */}
      </Drawer>
    </div>
  );
};
export default UpdateCompany;
