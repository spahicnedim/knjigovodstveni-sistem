import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  updateCompany,
  fetchoneCompany,
  fetchCompanies,
  fetchGradovi,
  fetchDrzave,
  fetchBanke,
} from "../../features/companies/companyThunks";
import { fetchServiceById } from "../../features/services/serviceThunk";
import { fetchUsers } from "../../features/users/userThunk";
import {
  createRacun,
  fetchRacuni,
  deleteRacun,
} from "../../features/racuni/racunThunk";

import io from "socket.io-client";
import { fetchDjelatnosti } from "../../features/djelatnost/djelatnostThunk";
import Drawer from "../Drawer";
import GradForm from "./CityForm";
import DrzavaForm from "./DrzavaForm";
import DjelatnostForm from "./DjelatnostForm";

const socket = io("http://localhost:3001");

const UpdateCompany = () => {
  const [name, setName] = useState("");
  const [adresa, setAdresa] = useState("");
  const [PDVbroj, setPDVbroj] = useState("");
  const [IDbroj, setIDbroj] = useState("");
  const [valuta, setValuta] = useState("");
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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");

  const { serviceId, companyId } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.current);
  const user = useSelector((state) => state.auth.user);
  const gradovi = useSelector((state) => state.company.gradovi);
  const company = useSelector((state) => state.company.current);
  const racuni = useSelector((state) => state.racun.racuni);
  const djelatnosti = useSelector((state) => state.djelatnost.djelatnosti);
  const drzave = useSelector((state) => state.company.drzave);
  const banke = useSelector((state) => state.company.banke);

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
      setValuta(company.valuta);
      setObveznikPDV(company.obveznikPDV);
      setTelefon(company.telefon);
      setFax(company.fax);
      setEmail(company.email);
      setWeb(company.web);
      setSjedisteId(Number(company.sjedisteId));
      setDrzavaId(Number(company.drzavaId));
      setDjelatnostId(Number(company.djelatnostId));
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
      valuta,
      djelatnostId,
      obveznikPDV,
      telefon,
      fax,
      email,
      web,
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
            <div className='flex items-center'>
              <Select
                options={gradovi.map((grad) => ({
                  value: grad.id,
                  label: grad.naziv,
                }))}
                value={
                  gradovi.find((grad) => grad.id === sjedisteId)
                    ? {
                        value: sjedisteId,
                        label: gradovi.find((grad) => grad.id === sjedisteId)
                          .naziv,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  setSjedisteId(selectedOption ? selectedOption.value : null)
                }
                placeholder='Select City'
                className='flex-grow'
              />
              <button
                type='button'
                className='ml-2 p-2 bg-blue-500 text-white rounded'
                onClick={() => openDrawer("city")}
              >
                Add Grad
              </button>
            </div>
            <input
              type='text'
              value={postalCode}
              readOnly
              placeholder='Postal Code'
              className='w-full p-2 border border-gray-300 rounded'
            />
            <div className='flex items-center'>
              <Select
                options={drzave.map((drzava) => ({
                  value: drzava.id,
                  label: drzava.naziv,
                }))}
                value={
                  drzave.find((drzava) => drzava.id === drzavaId)
                    ? {
                        value: drzavaId,
                        label: drzave.find((drzava) => drzava.id === drzavaId)
                          .naziv,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  setDrzavaId(selectedOption ? selectedOption.value : null)
                }
                placeholder='Select Drzava'
                className=''
              />
              <button
                type='button'
                className='ml-2 p-2 bg-blue-500 text-white rounded'
                onClick={() => openDrawer("drzava")}
              >
                Add Drzava
              </button>
            </div>
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

              <div className='flex items-center space-x-4'>
                <div className='flex-grow'>
                  <Select
                    options={djelatnosti.map((djelatnost) => ({
                      value: djelatnost.id,
                      label: djelatnost.naziv,
                    }))}
                    value={
                      djelatnosti.find(
                        (djelatnost) => djelatnost.id === djelatnostId
                      )
                        ? {
                            value: djelatnostId,
                            label: djelatnosti.find(
                              (djelatnost) => djelatnost.id === djelatnostId
                            ).naziv,
                          }
                        : null
                    }
                    onChange={(selectedOption) =>
                      setDjelatnostId(
                        selectedOption ? selectedOption.value : null
                      )
                    }
                    placeholder='Select Djelatnost'
                    className='w-full'
                  />
                </div>

                <input
                  type='text'
                  value={sifraDjelatnosti}
                  readOnly
                  placeholder='Sifra djelatnosti'
                  className='w-32 p-2 border border-gray-300 rounded'
                />

                <button
                  type='button'
                  className='p-2 bg-blue-500 text-white rounded'
                  onClick={() => openDrawer("djelatnost")}
                >
                  Add Djelatnost
                </button>
              </div>
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
            <h3 className='text-xl font-bold'>Existing Bank Accounts</h3>
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
