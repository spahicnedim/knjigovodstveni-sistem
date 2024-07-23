import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Companies from "./pages/Companies";
import CompanyList from "./components/CompanyList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/service/:id/' element={<CompanyList />} />
        <Route path='/service/:serviceId/company/:id' element={<Companies />} />
      </Routes>
    </Router>
  );
};

export default App;
