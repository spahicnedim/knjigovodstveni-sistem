import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  fetchCompanies,
  fetchoneCompany,
} from "../../features/companies/companyThunks";
import { fetchServiceById } from "../../features/services/serviceThunk";
import { fetchUserCompanies } from "../../features/auth/authThunks";
import { fetchUsers } from "../../features/users/userThunk";
import useAuthorization from "../useAuthorization";

const CompanyList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.current);
  const user = useSelector((state) => state.auth.user);
  const userCompanies = useSelector((state) => state.auth.companies);
  const companies = useSelector((state) => state.company.companies);
  const navigate = useNavigate();
  const isAdmin = useAuthorization([1]);

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
        dispatch(
          fetchoneCompany({ serviceId: service.id, companyId: companyId })
        );
        navigate(`/service/${service.id}/company/${companyId}/home`);
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
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Dobrodosao, {user?.username}</h1>
      <h2 className='text-xl font-semibold mb-4'>Firme</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center '>
        {isAdmin ? (
          companies.length > 0 ? (
            companies.map((company) => (
              <div
                key={company.id}
                className='bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow cursor-pointer'
                onClick={() => handleCompanyClick(company.id)}
              >
                <h3 className='text-lg font-semibold mb-2'>{company.name}</h3>
                <p className='text-gray-600'>Service ID: {company.serviceId}</p>
              </div>
            ))
          ) : (
            <p>No companies assigned.</p>
          )
        ) : userCompanies.length > 0 ? (
          userCompanies.map((company) => (
            <div
              key={company.id}
              className='bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow cursor-pointer '
              onClick={() => handleCompanyClick(company.id)}
            >
              <h3 className='text-lg font-semibold mb-2'>{company.name}</h3>
              <p className='text-gray-600'>Service ID: {company.serviceId}</p>
            </div>
          ))
        ) : (
          <p>No companies assigned.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
