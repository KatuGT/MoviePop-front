import { Outlet } from "react-router-dom";
import Navbar from "../../Componentes/Navbar/Navbar";
import LogoMoviePop from "./../../Imagenes/logo-movie-pop.svg";
import "./LoginRegistro.css";

const Registro = () => {
  return (
    <>
      <Navbar />
      <section className="contenedor-registro">
        <Outlet />
        <div className="logo-registro">
          <img src={LogoMoviePop} alt="Logo Moviepop!" />
        </div>
      </section>
    </>
  );
};

export default Registro;
