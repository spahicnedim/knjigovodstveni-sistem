import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBuilding, FaUser, FaUserPlus } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className='w-64 h-screen bg-gray-800 text-white'>
      <ul>
        <li>
          <NavLink
            to='home'
            className='flex items-center p-4 hover:bg-gray-700'
            activeClassName='bg-gray-600'
          >
            <FaHome className='mr-2' /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='dashboard/dodaj-firmu'
            className='flex items-center p-4 hover:bg-gray-700'
            activeClassName='bg-gray-600'
          >
            <FaBuilding className='mr-2' /> Create Company
          </NavLink>
        </li>
        <li>
          <NavLink
            to='dashboard/prava-zaposlenih'
            className='flex items-center p-4 hover:bg-gray-700'
            activeClassName='bg-gray-600'
          >
            <FaUser className='mr-2' /> Assign Employees
          </NavLink>
        </li>
        <li>
          <NavLink
            to='dashboard/dodaj-zaposlenog'
            className='flex items-center p-4 hover:bg-gray-700'
            activeClassName='bg-gray-600'
          >
            <FaUserPlus className='mr-2' /> Add Employee
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
