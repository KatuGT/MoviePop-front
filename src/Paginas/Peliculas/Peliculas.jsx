import Navbar from "./../../Componentes/Navbar/Navbar";
import "./Peliculas.css";
import Card from "./../../Componentes/Cards/Card.jsx";
import { useEffect, useState } from "react";
import Axios from "axios";

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    try {
      Axios.get("http://api.tvmaze.com/search/shows?q=star%20wars").then(
        (res) => setPeliculas(res.data)
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="contenedor-peliculas">
        <div className="contenedor-buscador">
          <input
            type="search"
            placeholder="Buscar"
            className="buscador-peliculas"
          />
        </div>
        <h2 className="encabezado-peliculas">Películas</h2>
        <div className="separador"></div>
        <div className="contenedor-card">
          {peliculas.map((pelicula, index) => (
            <Card pelicula={pelicula} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Peliculas;
