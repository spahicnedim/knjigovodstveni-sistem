import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchoneCompany } from "../../features/companies/companyThunks";
import { logout } from "../../features/auth/authSlice";

const CompanyDetail = () => {
  const { serviceId, companyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const company = useSelector((state) => state.company.current);

  console.log(serviceId, companyId);
  useEffect(() => {
    dispatch(fetchoneCompany({ serviceId, companyId }));
  }, [dispatch, serviceId, companyId]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return (
      <div>
        <p>Error: {error.message}</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div>
      {/*<h1>{company.name}</h1>*/}
      {/*<p>Service ID: {company.serviceId}</p>*/}
      {/*<button onClick={handleLogout}>Logout</button>*/}
    </div>
  );
};

export default CompanyDetail;
