import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="wrapper-login">
          <NavLink to="/rl/registro" className="registro link">
            Registrate
          </NavLink>
          <NavLink to="/rl/login" className="login link">
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
