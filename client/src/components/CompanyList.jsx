import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  createCompany,
  fetchCompanies,
  fetchoneCompany,
} from "../features/companies/companyThunks";
import { fetchServiceById } from "../features/services/serviceThunk";
import { fetchUserCompanies } from "../features/auth/authThunks";
import {
  createUser,
  fetchUsers,
  assignUserToCompany,
  removeUserFromCompany,
} from "../features/users/userThunk";
import { logout } from "../features/auth/authSlice";

const CompanyList = () => {
  const [name, setName] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.current);
  const user = useSelector((state) => state.auth.user);
  const userCompanies = useSelector((state) => state.auth.companies);
  const users = useSelector((state) => state.users.users);
  const companies = useSelector((state) => state.company.companies);
  const navigate = useNavigate();

  const [checkboxState, setCheckboxState] = useState({});

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

  useEffect(() => {
    if (users.length > 0 && companies.length > 0) {
      const initialCheckboxState = {};
      users.forEach((user) => {
        initialCheckboxState[user.id] = {};
        companies.forEach((company) => {
          initialCheckboxState[user.id][company.id] = user.companies?.some(
            (comp) => comp.id === company.id
          );
        });
      });
      setCheckboxState(initialCheckboxState);
    }
  }, [users, companies]);

  const handleCompanyClick = async (companyId) => {
    try {
      const company = companies.find((company) => company.id === companyId);
      if (company && company.serviceId === service.id) {
        dispatch(fetchoneCompany({ serviceId: service.id, id: companyId }));
        navigate(`/service/${service.id}/company/${companyId}`);
      } else {
        throw new Error("Company does not belong to the current service.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCheckboxChange = (userId, companyId, isChecked) => {
    setCheckboxState((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [companyId]: isChecked,
      },
    }));

    if (isChecked) {
      dispatch(assignUserToCompany({ userId, companyId }));
    } else {
      dispatch(removeUserFromCompany({ userId, companyId }));
    }
  };

  const handleCompanyCreate = (e) => {
    e.preventDefault();
    dispatch(createCompany({ name, serviceId: service.id }));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Your Companies</h2>
      {companies.length > 0 ? (
        <ul>
          {userCompanies.map((company) => (
            <li key={company.id}>
              <a
                onClick={() => handleCompanyClick(company.id)}
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                {company.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No companies assigned.</p>
      )}

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

      <h2>Assign Employees to Companies</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username}
              {companies.map((company) => (
                <div key={company.id}>
                  <label>
                    <input
                      type='checkbox'
                      onChange={(e) =>
                        handleCheckboxChange(
                          user.id,
                          company.id,
                          e.target.checked
                        )
                      }
                      checked={
                        checkboxState[user.id] &&
                        checkboxState[user.id][company.id]
                      }
                    />
                    {company.name}
                  </label>
                </div>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default CompanyList;
