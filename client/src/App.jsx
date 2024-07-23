import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Companies from "./pages/Companies";
import ServiceDetail from "./pages/ServiceDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/service/:serviceId' element={<ServiceDetail />} />
        <Route path='/service/:serviceId/company/:id' element={<Companies />} />
      </Routes>
    </Router>
  );
};

export default App;
