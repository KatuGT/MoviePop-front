import Navbar from "./../../Componentes/Navbar/Navbar";
import "./Peliculas.css";
import Card from "./../../Componentes/Cards/Card.jsx"

const Peliculas = () => {
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
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    </>
  );
};

export default Peliculas;
