import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createService } from "../features/services/serviceThunk";
import { logout } from "../features/auth/authSlice";

const ServiceForm = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.service.error);
  const user = useSelector((state) => state.auth);
  const ownerId = user.user.userId;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createService({ name, ownerId: ownerId }));
    console.log(ownerId);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Service Name'
      />
      <button type='submit'>Create Service</button>
      {error && <p>{error}</p>}
      <button onClick={handleLogout}>Logout</button>
    </form>
  );
};

export default ServiceForm;
