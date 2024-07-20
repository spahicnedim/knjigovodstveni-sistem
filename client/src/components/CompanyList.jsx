import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchoneCompany } from "../features/companies/companyThunks";
import { fetchServiceById } from "../features/services/serviceThunk";
import { fetchUserCompanies } from "../features/auth/authThunks";

const CompanyList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.current);
  const companies = useSelector((state) => state.company.companies);
  const user = useSelector((state) => state.auth.user);
  const userCompanies = useSelector((state) => state.auth.companies);
  const navigate = useNavigate();

  useEffect(() => {
    if (!service || service.id !== id) {
      dispatch(fetchServiceById(id));
    }
  }, [id]);

  useEffect(() => {
    if (user && user.userId) {
      console.log("Dispatching fetchUserCompanies with userId:", user.userId);
      dispatch(fetchUserCompanies(user.userId));
    } else {
      console.log("User ID is not available");
    }
  }, []);
  //   useEffect(() => {
  //     if (service?.id) {
  //       dispatch(fetchCompanies(service.id));
  //     }
  //   }, [service]);

  const handleCompanyClick = async (companyId) => {
    try {
      const company = userCompanies.find((company) => company.id === companyId);
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
      {/* <h2>Companies</h2>
      {companies.length > 0 ? (
        <ul>
          {companies.map((company) => (
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
        <p>No companies found.</p>
      )} */}

      <h1>Welcome, {user?.username}</h1>
      <h2>Your Companies</h2>
      {userCompanies.length > 0 ? (
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
