import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaUser,
  FaUserPlus,
  FaChevronUp,
  FaChevronDown,
  FaLock,
} from "react-icons/fa";
import useAuthorization from "./useAuthorization";

const Sidebar = () => {
  const isVlasnik = useAuthorization([1, 3]);
  const isAdmin = useAuthorization([1]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className='w-60 h-screen bg-gray-800 text-white'>
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
        {isVlasnik && (
          <li>
            <div
              className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'
              onClick={toggleDropdown}
            >
              <FaBuilding className='mr-2' /> Dashboard
              {isDropdownOpen ? (
                <FaChevronUp className='ml-auto' />
              ) : (
                <FaChevronDown className='ml-auto' />
              )}
            </div>
            {isDropdownOpen && (
              <ul className='pl-4'>
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
            )}
          </li>
        )}

        {isAdmin && (
          <li>
            <NavLink
              to='/admin/services'
              className='flex items-center p-4 hover:bg-gray-700'
              activeClassName='bg-gray-600'
            >
              <FaLock className='mr-2' /> Admin panel
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
