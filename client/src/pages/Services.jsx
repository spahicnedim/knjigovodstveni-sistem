import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchServices } from "../features/services/serviceThunk";
import ServiceForm from "../components/ServiceForm";

const Services = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.services);

  // useEffect(() => {
  //   dispatch(fetchServices());
  // }, [dispatch]);

  return (
    <div>
      <h1>Services</h1>
      <ServiceForm />
      {/* <ul>
        {services.map((service) => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Services;
