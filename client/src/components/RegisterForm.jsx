import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { register } from "../features/auth/authThunks";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [roleName, setRoleName] = useState("");
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(register({ email, password, username, roleName }));
  };

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
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
        <input
          type='text'
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder='Role'
        />
        <button type='submit'>Register</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default RegisterForm;
