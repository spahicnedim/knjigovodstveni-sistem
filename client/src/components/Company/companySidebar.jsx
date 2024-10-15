import { useState } from "react";
import { Link } from "react-router-dom";
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

const CompanySidebar = ({ setPageTitle }) => {
  const isVlasnik = useAuthorization([1, 3]);
  const isAdmin = useAuthorization([1]);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sidebar
      className=''
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
          onClick={() => setPageTitle("Home")}
        >
          Home
        </MenuItem>
        <MenuItem
          component={<Link to='unosRobe' />}
          icon={<FaHome />}
          className='text-white hover:text-black'
          onClick={() => setPageTitle("Kreiraj Dokumente")}
        >
          Kreiraj dokumente
        </MenuItem>

        <MenuItem
          component={<Link to='lista-dokumenata' />}
          icon={<FaHome />}
          className='text-white hover:text-black'
          onClick={() => setPageTitle("Lista Dokumenata")}
        >
          Lista Dokumenata
        </MenuItem>
        <SubMenu
            label='Knjige'
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
              component={<Link to='knjige/KUF/1' />}
              icon={<FaHome />}
              className='text-white hover:text-black'
              onClick={() => setPageTitle("KUF")}
          >
            KUF
          </MenuItem>
          <MenuItem
              component={<Link to='knjige/KIF/2' />}
              icon={<FaHome />}
              className='text-white hover:text-black'
              onClick={() => setPageTitle("KIF")}
          >
            KIF
          </MenuItem>
        </SubMenu>

        <SubMenu
          label='Sifrarnik'
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
            component={<Link to='sifrarnik/skladiste' />}
            icon={<FaHome />}
            className='text-white hover:text-black'
            onClick={() => setPageTitle("Skladiste")}
          >
            Skladiste
          </MenuItem>
          <MenuItem
            component={<Link to='sifrarnik/poslovnica' />}
            icon={<FaHome />}
            className='text-white hover:text-black'
            onClick={() => setPageTitle("Poslovnica")}
          >
            Poslovnica
          </MenuItem>
          <MenuItem
              component={<Link to='sifrarnik/artikli' />}
              icon={<FaHome />}
              className='text-white hover:text-black'
              onClick={() => setPageTitle("Artikli")}
          >
            Artikli
          </MenuItem>
        </SubMenu>
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
              onClick={() => setPageTitle("Dodaj Firmu")}
            >
              Dodaj Firmu
            </MenuItem>
            <MenuItem
              component={<Link to='dashboard/dodaj-kupacDobavljac' />}
              icon={<FaBuilding />}
              className='text-white hover:text-black'
              onClick={() => setPageTitle("Dodaj Kupca/Dobavljaca")}
            >
              Dodaj Kupca/Dobavljaca
            </MenuItem>
            <MenuItem
              component={<Link to='dashboard/prava-zaposlenih' />}
              icon={<FaUser />}
              className='text-white hover:text-black'
              onClick={() => setPageTitle("Prava Zaposlenih")}
            >
              Prava Zaposlenih
            </MenuItem>
            <MenuItem
              component={<Link to='dashboard/dodaj-radnika' />}
              icon={<FaUserPlus />}
              className='text-white hover:text-black'
              onClick={() => setPageTitle("Dodaj Zaposlenog")}
            >
              Dodaj Radnika
            </MenuItem>
          </SubMenu>
        )}
        <MenuItem
          component={<Link to='kasa' />}
          icon={<FaUserPlus />}
          className='text-white hover:text-black'
          onClick={() => setPageTitle("POS Kasa")}
        >
          POS Kasa
        </MenuItem>
        {isAdmin && (
          <MenuItem
            component={<Link to='/admin/services' />}
            icon={<FaLock />}
            className='text-white hover:text-black'
            onClick={() => setPageTitle("Admin panel")}
          >
            Admin panel
          </MenuItem>
        )}
      </Menu>
    </Sidebar>
  );
};

export default CompanySidebar;
