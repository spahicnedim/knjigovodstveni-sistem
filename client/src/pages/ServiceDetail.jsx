import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Route, Routes } from "react-router-dom";
import { fetchServiceById } from "../features/services/serviceThunk";
import { logout } from "../features/auth/authSlice";
import CompanyList from "../components/CompanyList";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";

const ServiceDetail = () => {
  const service = useSelector((state) => state.service.current);
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!service || service.id !== serviceId) {
      dispatch(fetchServiceById(serviceId));
    }
  }, [serviceId, service, dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-4'>
        <h1>{service?.name}</h1>
        <p>Owner ID: {service?.ownerId}</p>
        <button onClick={handleLogout}>Logout</button>
        <Routes>
          <Route path='home' element={<CompanyList />} />
          <Route path='dashboard/*' element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default ServiceDetail;
