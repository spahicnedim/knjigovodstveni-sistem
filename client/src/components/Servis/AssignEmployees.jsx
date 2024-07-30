import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCompanies } from "../../features/companies/companyThunks";
import { fetchServiceById } from "../../features/services/serviceThunk";
import { fetchUserCompanies } from "../../features/auth/authThunks";
import {
  fetchUsers,
  assignUserToCompany,
  removeUserFromCompany,
} from "../../features/users/userThunk";

const AssignEmployees = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.current);
  const user = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users.users);
  const companies = useSelector((state) => state.company.companies);

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

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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

export default AssignEmployees;
