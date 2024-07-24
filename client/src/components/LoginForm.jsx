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
        navigate(`/service/${user.serviceId}/home`);
      }
    }

    if (userCompanies?.length > 0) {
      const company = userCompanies.find((company) => company.id);
      console.log(company.id);
      navigate(`/service/${company.serviceId}/company/${company.serviceId}`);
    }
  }, [user, services, userCompanies, navigate]);

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   dispatch(logout());
  // };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-sm'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className='w-full px-4 py-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='w-full px-4 py-2 border border-gray-300 rounded'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200'
          >
            Login
          </button>
          {/* <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200">
            Logout
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
