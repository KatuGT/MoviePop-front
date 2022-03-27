import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AutContext } from "../../Context/AutContext";
import axios from "axios";

const Navbar = () => {
  const { usuario } = useContext(AutContext);

  //GET USUARIO
  const [datosActualesUsuario, setDatosActualesUsuario] = useState([]);

  useEffect(() => {
    async function getUsuario() {
      try {
        const datosUduarios = await axios.get(
          `http://localhost:5002/api/usuario/find/${usuario._id}`
        );
        setDatosActualesUsuario(datosUduarios.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsuario()
  }, [usuario._id]);

  return (
    <>
      <nav>
        <div className="wrapper-login">
          {usuario ? (
            <NavLink to="/rl/registro" className="registro link">
              <div className="usuario-nav">
                <i className="fas fa-user-circle"></i>
                <p>{datosActualesUsuario.username}</p>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/rl/registro" className="registro link">
              Registrate
            </NavLink>
          )}
          {usuario ? (
            <p className="link">Cerrar sesión</p>
          ) : (
            <NavLink to="/rl/login" className="login link">
              Inicia sesión
            </NavLink>
          )}
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
