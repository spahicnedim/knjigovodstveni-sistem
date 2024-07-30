import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaHome, FaBuilding, FaUser, FaUserPlus, FaLock } from "react-icons/fa";
import useAuthorization from "../useAuthorization";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import "../../styles/sidebar.css";

const CompanySidebar = () => {
  const isVlasnik = useAuthorization([1, 3]);
  const isAdmin = useAuthorization([1]);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sidebar
      className='h-screen'
      backgroundColor='#023E8A'
      collapsed={collapsed}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <Menu>
        <MenuItem
          component={<Link to='home' />}
          icon={<FaHome />}
          className='text-white hover:text-black'
        >
          Home
        </MenuItem>
        {isVlasnik && (
          <SubMenu
            label='Dashboard'
            className='text-white'
            icon={<FaBuilding />}
            rootStyles={{
              ["& > ." + menuClasses.button]: {
                backgroundColor: "#023E8A",
                color: "white",
                "&:hover": {
                  color: "black",
                },
              },
              ["." + menuClasses.subMenuContent]: {
                backgroundColor: "#023E8A",
                color: "white",
              },
            }}
          >
            <MenuItem
              component={<Link to='dashboard/dodaj-firmu' />}
              icon={<FaBuilding />}
              className='text-white hover:text-black'
            >
              Dodaj Firmu
            </MenuItem>
            <MenuItem
              component={<Link to='dashboard/prava-zaposlenih' />}
              icon={<FaUser />}
              className='text-white hover:text-black'
            >
              Prava Zaposlenih
            </MenuItem>
            <MenuItem
              component={<Link to='dashboard/dodaj-zaposlenog' />}
              icon={<FaUserPlus />}
              className='text-white hover:text-black'
            >
              Dodaj Zaposlenog
            </MenuItem>
          </SubMenu>
        )}
        {isAdmin && (
          <MenuItem
            component={<Link to='/admin/services' />}
            icon={<FaLock />}
            className='text-white hover:text-black'
          >
            Admin panel
          </MenuItem>
        )}
      </Menu>
    </Sidebar>
  );
};

export default CompanySidebar;
