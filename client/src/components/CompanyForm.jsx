import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchoneCompany } from "../features/companies/companyThunks";

const CompanyDetail = () => {
  const { serviceId, id } = useParams();
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.current);
  const error = useSelector((state) => state.company.error);

  useEffect(() => {
    dispatch(fetchoneCompany({ serviceId, id }));
  }, [dispatch, serviceId, id]);

  if (error) {
    return <div>Error:</div>;
  }

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{company.name}</h1>
      <p>Service ID: {company.serviceId}</p>
      {/* Dodajte ostale detalje o kompaniji koje želite prikazati */}
    </div>
  );
};

export default CompanyDetail;
