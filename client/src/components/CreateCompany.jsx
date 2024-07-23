import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createCompany,
  fetchCompanies,
} from "../features/companies/companyThunks";
import { fetchServiceById } from "../features/services/serviceThunk";
import { fetchUsers } from "../features/users/userThunk";

const CreateCompany = () => {
  const [name, setName] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.current);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
    }
  }, [user, id, dispatch]);

  useEffect(() => {
    if (service.id) {
      dispatch(fetchCompanies(service.id));
      dispatch(fetchUsers(service.id));
    }
  }, [service, dispatch]);

  const handleCompanyCreate = (e) => {
    e.preventDefault();
    dispatch(createCompany({ name, serviceId: service.id }));
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Create company</h2>
      <form onSubmit={handleCompanyCreate}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Company Name'
        />
        <button type='submit'>Create Company</button>
      </form>
    </div>
  );
};

export default CreateCompany;
