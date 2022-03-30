import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AutContext } from "../../Context/AutContext";
import axios from "axios";

const Navbar = () => {
  const { usuario, dispatch } = useContext(AutContext);

  //GET USUARIO
  const [datosActualesUsuario, setDatosActualesUsuario] = useState([]);

  useEffect(() => {
    async function getUsuario() {
      try {
        if (usuario !== null) {
          const datosUduarios = await axios.get(
            `http://localhost:5002/api/usuario/find/${usuario?._id}`
          );
          setDatosActualesUsuario(datosUduarios?.data);
        } else {
          setDatosActualesUsuario([]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUsuario();
  }, [usuario, setDatosActualesUsuario]);

  let navigate = useNavigate();

  //CERRAR SESION
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <>
      <nav>
        <div className="wrapper-login">
          {usuario !== null ? (
            <NavLink to="/configuracion" className="registro link foto">
              <div className="usuario-nav">
                {datosActualesUsuario?.fotoPerfil ? (
                  <>
                    <img
                      src={datosActualesUsuario?.fotoPerfil}
                      alt="foto de perfil"
                      className="foto-nav"
                    />
                    <span className="nav-userneme">
                      {datosActualesUsuario?.username}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="default-foto">
                      {datosActualesUsuario.username?.charAt(0)}
                    </span>
                    <span className="nav-userneme">
                      {datosActualesUsuario?.username}
                    </span>
                  </>
                )}
              </div>
            </NavLink>
          ) : (
            <NavLink to="/rl/registro" className="registro link">
              Registrate
            </NavLink>
          )}
          {usuario !== null ? (
            <p onClick={handleLogout} className="link cerrar-sesion">
              Cerrar sesión
            </p>
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
