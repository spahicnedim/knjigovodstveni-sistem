import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, fetchUserCompanies } from "../features/auth/authThunks";
import { logout } from "../features/auth/authSlice";
import { fetchServices } from "../features/services/serviceThunk";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.auth.user);
  const services = useSelector((state) => state.service.services);
  const companies = useSelector((state) => state.company.companies);
  const userCompanies = useSelector((state) => state.auth.companies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchUserCompanies(user?.userId));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user?.serviceId && services?.length > 0) {
      const matchService = services.find(
        (service) => service.id === user?.serviceId
      );
      if (matchService) {
        navigate(`/service/${user.serviceId}`);
      }
    }

    if (userCompanies?.length > 0) {
      const company = userCompanies.find((company) => company.id);
      console.log(company.id);
      navigate(`/service/${company.serviceId}/company/${company.serviceId}`);
    }
  }, [user, services, userCompanies, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  // navigate("/");
  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <button type='submit'>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </form>
    </>
  );
};

export default LoginForm;
