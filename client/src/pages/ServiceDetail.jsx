import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchServiceById } from "../features/services/serviceThunk";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import CompanyList from "../components/CompanyList";
import CreateCompany from "../components/CreateCompany";
import AssignEmployees from "../components/AssignEmployees";
import CreateEmployees from "../components/CreateEmployees";

const ServiceDetail = () => {
  const service = useSelector((state) => state.service.current);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!service || service.id !== id) {
      dispatch(fetchServiceById(id));
    }
  }, [id]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      <h1>{service.name}</h1>
      <p>Owner ID: {service.ownerId}</p>
      <button onClick={handleLogout}>Logout</button>
      <CompanyList />
      <CreateCompany />
      <AssignEmployees />
      <CreateEmployees />
    </div>
  );
};

export default ServiceDetail;
