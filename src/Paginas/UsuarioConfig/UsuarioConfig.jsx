import "./UsuarioConfig.css";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../Componentes/Navbar/Navbar";

const UsuarioConfig = () => {
  return (
    <div className="contenedor-configuracion">
        <Navbar/>
      <nav className="nav-configuracion">
        <NavLink to="mi-cuenta" className="mis-datos link">
          Mi cuenta
        </NavLink>
        <NavLink to="favoritos" className="mis-datos link">
          Mis favoritos
        </NavLink>
        <NavLink to="lista-usuarios" className="mis-datos link">
          Lista usuarios
        </NavLink>
      </nav>
      <Outlet/>
    </div>
  );
};

export default UsuarioConfig;
