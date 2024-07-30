import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  createCompany,
  updateCompany,
  fetchoneCompany,
  fetchCompanies,
  fetchGradovi,
} from "../../features/companies/companyThunks";
import { fetchServiceById } from "../../features/services/serviceThunk";
import { fetchUsers } from "../../features/users/userThunk";

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

  const { serviceId, companyId } = useParams(); // Get companyId from URL params
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.current);
  const user = useSelector((state) => state.auth.user);
  const gradovi = useSelector((state) => state.company.gradovi);
  const company = useSelector((state) => state.company.current); // Select current company

  console.log(serviceId, companyId);
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
      dispatch(fetchoneCompany({ serviceId, companyId })); // Fetch company data if companyId exists
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
    }
  }, [company]);

  const handleCompanyCreate = (e) => {
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

    // history.push("/path-to-redirect-after-create-or-update");
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>Update Company</h2>
      <form onSubmit={handleCompanyCreate} className='space-y-4'>
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
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          Update Company
        </button>
      </form>
    </div>
  );
};

export default UpdateCompany;
