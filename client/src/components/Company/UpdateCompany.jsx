import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  updateCompany,
  fetchoneCompany,
  fetchCompanies,
  fetchGradovi,
} from "../../features/companies/companyThunks";
import { fetchServiceById } from "../../features/services/serviceThunk";
import { fetchUsers } from "../../features/users/userThunk";
import {
  createRacun,
  fetchRacuni,
  deleteRacun,
} from "../../features/racuni/racunThunk";

import io from "socket.io-client";
import {
  createOrUpdateDjelatnost,
  fetchDjelatnostByCompanyId,
} from "../../features/djelatnost/djelatnostThunk";

const socket = io("http://localhost:3001");

const UpdateCompany = () => {
  const [name, setName] = useState("");
  const [adresa, setAdresa] = useState("");
  const [drzava, setDrzava] = useState("");
  const [PDVbroj, setPDVbroj] = useState("");
  const [IDbroj, setIDbroj] = useState("");
  const [valuta, setValuta] = useState("");
  const [obveznikPDV, setObveznikPDV] = useState(false);
  const [telefon, setTelefon] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");
  const [sjedisteId, setSjedisteId] = useState(null);
  const [naziv_banke, setNazivBanke] = useState("");
  const [br_racuna, setBrRacuna] = useState("");
  const [devizni, setDevizni] = useState(false);
  const [djelatnostNaziv, setDjelatnostNaziv] = useState("");
  const [djelatnostSifra, setDjelatnostSifra] = useState("");

  const { serviceId, companyId } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.current);
  const user = useSelector((state) => state.auth.user);
  const gradovi = useSelector((state) => state.company.gradovi);
  const company = useSelector((state) => state.company.current);
  const racuni = useSelector((state) => state.racun.racuni);
  const djelatnost = useSelector((state) => state.djelatnost.djelatnosti);

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
    }
  }, [service, dispatch]);

  useEffect(() => {
    if (companyId) {
      dispatch(fetchoneCompany({ serviceId, companyId }));
      dispatch(fetchRacuni(companyId));
      dispatch(fetchDjelatnostByCompanyId(companyId));
    }
  }, [companyId, dispatch]);

  useEffect(() => {
    if (company) {
      setName(company.name);
      setAdresa(company.adresa);
      setDrzava(company.drzava);
      setPDVbroj(company.PDVbroj);
      setIDbroj(company.IDbroj);
      setValuta(company.valuta);
      setObveznikPDV(company.obveznikPDV);
      setTelefon(company.telefon);
      setFax(company.fax);
      setEmail(company.email);
      setWeb(company.web);
      setSjedisteId(company.sjedisteId);
      setDjelatnostNaziv(djelatnost?.naziv);
      setDjelatnostSifra(djelatnost?.sifra);
    }

    if (djelatnost) {
      setDjelatnostNaziv(djelatnost.naziv);
      setDjelatnostSifra(djelatnost.sifra);
    } else {
      setDjelatnostNaziv("");
      setDjelatnostSifra("");
    }
  }, [company, djelatnost]);

  const handleCompanyUpdate = (e) => {
    e.preventDefault();
    const companyData = {
      name,
      adresa,
      sjedisteId,
      drzava,
      PDVbroj,
      IDbroj,
      valuta,
      obveznikPDV,
      telefon,
      fax,
      email,
      web,
    };

    dispatch(updateCompany({ companyId, companyData }));

    if (djelatnostNaziv && djelatnostSifra) {
      const decimalSifra = parseFloat(djelatnostSifra);

      dispatch(
        createOrUpdateDjelatnost({
          naziv: djelatnostNaziv,
          sifra: decimalSifra,
          companyId,
        })
      );
    }
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
      naziv_banke,
      br_racuna,
      devizni,
      companyId,
    };
    dispatch(createRacun(racunData));
  };

  const handleRacunDelete = (id) => {
    dispatch(deleteRacun(id));
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-white shadow-md rounded-lg p-4'>
          <h2 className='text-2xl font-bold mb-4'>Update Company</h2>
          <form onSubmit={handleCompanyUpdate} className='space-y-4'>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Company Name'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <input
              type='text'
              value={adresa}
              onChange={(e) => setAdresa(e.target.value)}
              placeholder='Address'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <select
              value={sjedisteId}
              onChange={(e) => setSjedisteId(Number(e.target.value))}
              className='w-full p-2 border border-gray-300 rounded'
            >
              <option value=''>Select City</option>
              {gradovi.map((grad) => (
                <option key={grad.id} value={grad.id}>
                  {grad.naziv}
                </option>
              ))}
            </select>
            <input
              type='text'
              value={drzava}
              onChange={(e) => setDrzava(e.target.value)}
              placeholder='Country'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <input
              type='text'
              value={PDVbroj}
              onChange={(e) => setPDVbroj(e.target.value)}
              placeholder='PDV Number'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <input
              type='text'
              value={IDbroj}
              onChange={(e) => setIDbroj(e.target.value)}
              placeholder='ID Number'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <input
              type='text'
              value={valuta}
              onChange={(e) => setValuta(e.target.value)}
              placeholder='Currency'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={obveznikPDV}
                onChange={(e) => setObveznikPDV(e.target.checked)}
                className='form-checkbox'
              />
              <span>Obveznik PDV</span>
            </label>
            <input
              type='text'
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              placeholder='Phone'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <input
              type='text'
              value={fax}
              onChange={(e) => setFax(e.target.value)}
              placeholder='Fax'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <input
              type='text'
              value={web}
              onChange={(e) => setWeb(e.target.value)}
              placeholder='Website'
              className='w-full p-2 border border-gray-300 rounded'
            />

            <div className='bg-white shadow-md rounded-lg p-4'>
              <h2 className='text-2xl font-bold mb-4'>Djelatnost Details</h2>
              <form className='space-y-4'>
                <input
                  type='text'
                  value={djelatnostNaziv}
                  onChange={(e) => setDjelatnostNaziv(e.target.value)}
                  placeholder='Djelatnost Naziv'
                  className='w-full p-2 border border-gray-300 rounded'
                />
                <input
                  type='number'
                  step='0.01'
                  value={djelatnostSifra}
                  onChange={(e) => setDjelatnostSifra(e.target.value)}
                  placeholder='Djelatnost Sifra'
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </form>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
            >
              Update Company
            </button>
          </form>
        </div>

        <div className='bg-white shadow-md rounded-lg p-4'>
          <h2 className='text-2xl font-bold mb-4'>Bank Account Details</h2>
          <form onSubmit={handleBankDetailsCreate} className='space-y-4'>
            <input
              type='text'
              value={naziv_banke}
              onChange={(e) => setNazivBanke(e.target.value)}
              placeholder='Bank Name'
              className='w-full p-2 border border-gray-300 rounded'
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
            <h3 className='text-xl font-bold'>Existing Bank Accounts</h3>
            <ul className='mt-2'>
              {racuni.map((racun) => (
                <li
                  key={racun.id}
                  className='flex justify-between items-center p-2 border-b'
                >
                  <span>
                    {racun.naziv_banke} - {racun.br_racuna}
                  </span>
                  <button
                    onClick={() => handleRacunDelete(racun.id)}
                    className='text-red-500 hover:underline'
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateCompany;
