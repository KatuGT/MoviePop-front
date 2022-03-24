import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="wrapper-login">
          <NavLink to="/singin" className="registro link">
            Registrate
          </NavLink>
          <NavLink to="/login" className="login link">
            Inicia sesión
          </NavLink>
        </div>
        <div className="wrapper-home">
          <NavLink to="/" className="link">
            <i className="fas fa-home"></i>
          </NavLink>
          <NavLink to="/peliculas" className="link">
            <i className="fas fa-search"></i>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
