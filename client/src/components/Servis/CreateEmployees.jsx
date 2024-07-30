import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCompanies } from "../../features/companies/companyThunks";
import { fetchServiceById } from "../../features/services/serviceThunk";
import { fetchUserCompanies } from "../../features/auth/authThunks";
import { createUser, fetchUsers } from "../../features/users/userThunk";

const CreateEmployees = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [roleName, setRoleName] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.current);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.userId) {
      dispatch(fetchUserCompanies(user.userId));
    }
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

  const handleCreateUser = (e) => {
    e.preventDefault();
    dispatch(
      createUser({
        email,
        password,
        username,
        roleName,
        serviceId: service.id,
      })
    );
    setEmail("");
    setPassword("");
    setUsername("");
    setRoleName("");
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-md  p-4'>
      <h2 className='text-2xl font-bold mb-4'>Napravi Zaposlenika</h2>
      <form onSubmit={handleCreateUser} className='space-y-4'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='w-full p-2 border border-gray-300 rounded-md'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='w-full p-2 border border-gray-300 rounded-md'
        />
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          className='w-full p-2 border border-gray-300 rounded-md'
        />
        <input
          type='text'
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder='Naziv role'
          className='w-full p-2 border border-gray-300 rounded-md'
        />
        <button
          type='submit'
          className='w-full py-2 bg-default-blue text-white font-semibold rounded-md hover:bg-blue-600 transition'
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateEmployees;
