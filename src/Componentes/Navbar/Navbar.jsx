import React from "react";
import "./Navbar.css"

const Navbar = () => {
  return (
    <>
      <nav>
          <div className="wrapper-login">
              <p className="registro">Registrate</p>
              <p className="login">Inicia sesión</p>
          </div>
          <div className="wrapper-home">
          <i className="fas fa-home"></i>
          <i className="fas fa-search"></i>
          </div>
      </nav>

    </>
  );
};

export default Navbar;
