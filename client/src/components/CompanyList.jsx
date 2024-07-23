import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  fetchCompanies,
  fetchoneCompany,
} from "../features/companies/companyThunks";
import { fetchServiceById } from "../features/services/serviceThunk";
import { fetchUserCompanies } from "../features/auth/authThunks";
import { fetchUsers } from "../features/users/userThunk";

const CompanyList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.current);
  const user = useSelector((state) => state.auth.user);
  const userCompanies = useSelector((state) => state.auth.companies);
  const companies = useSelector((state) => state.company.companies);
  const navigate = useNavigate();

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

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
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
    </div>
  );
};

export default CompanyList;
