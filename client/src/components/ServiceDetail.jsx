import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  createCompany,
  fetchCompanies,
  fetchoneCompany,
} from "../features/companies/companyThunks";
import { fetchServiceById } from "../features/services/serviceThunk";
import { createUser, fetchUsers } from "../features/users/userThunk";
import { logout } from "../features/auth/authSlice";

const ServiceDetail = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [roleName, setRoleName] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.current);
  const companies = useSelector((state) => state.company.companies);
  const users = useSelector((state) => state.users.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!service || service.id !== id) {
      dispatch(fetchServiceById(id));
    }
  }, [id]);

  useEffect(() => {
    if (service?.id) {
      dispatch(fetchCompanies(service.id));
    }
  }, [service]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCompany({ name, serviceId: service.id }));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    dispatch(
      createUser({ email, password, username, roleName, serviceId: service.id })
    );
    setEmail("");
    setPassword("");
    setUsername("");
    setRoleName("");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const handleCompanyClick = async (companyId) => {
    try {
      const company = companies.find((company) => company.id === companyId);
      if (company && company.serviceId === service.id) {
        dispatch(fetchoneCompany({ serviceId: service.id, id: companyId }));
        navigate(`/service/${service.id}/company/${companyId}`);
      } else {
        throw new Error("Company does not belong to the current service.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{service.name}</h1>
      <p>Owner ID: {service.ownerId}</p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Company Name'
        />
        <button type='submit'>Create Company</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
      <h2>Companies</h2>
      {companies.length > 0 ? (
        <ul>
          {companies.map((company) => (
            <li key={company.id}>
              <a
                onClick={() => handleCompanyClick(company.id)}
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                {company.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No companies found.</p>
      )}

      <form onSubmit={handleCreateUser}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <input
          type='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
        <input
          type='roleName'
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder='Naziv role'
        />
        <button type='submit'>Create user</button>
      </form>
    </div>
  );
};

export default ServiceDetail;
