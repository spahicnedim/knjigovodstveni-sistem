import React, { useEffect } from "react";
import {
  fetchServices,
  fetchServiceById,
} from "../features/services/serviceThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const services = useSelector((state) => state.service.services);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleCompanyClick = async (serviceId) => {
    dispatch(fetchServiceById(serviceId));
    navigate(`/service/${serviceId}/home`);
  };
  return (
    <div>
      <p>Admin Page</p>
      {services.length > 0 ? (
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              <a
                onClick={() => handleCompanyClick(service.id)}
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                {service.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No services assigned.</p>
      )}
    </div>
  );
};

export default AdminPage;
