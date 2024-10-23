import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load komponente
const Login = lazy(() => import("./pages/Login"));
const Companies = lazy(() => import("./pages/Companies"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

const App = () => {
  return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/service/:serviceId/*' element={<ServiceDetail />} />
            <Route
                path='/service/:serviceId/company/:companyId/*'
                element={<Companies />}
            />
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route
                path='/admin/services'
                element={<AdminPage />}
                allowedRoles={[1]}
            />
          </Routes>
        </Suspense>
      </Router>
  );
};

export default App;
