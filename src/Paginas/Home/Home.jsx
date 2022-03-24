import React from "react";
import Navbar from "../../Componentes/Navbar/Navbar";
import LogoMoviePop from "./../../Imagenes/logo-movie-pop.svg";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="contenedor-logo">
        <figure className="logo">
          <img src={LogoMoviePop} alt="logo" />
        </figure>
      </div>
    </div>
  );
};

export default Home;
