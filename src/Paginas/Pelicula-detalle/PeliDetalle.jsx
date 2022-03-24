import "./PeliDetalle.css";
import { Link } from "react-router-dom";

const PeliDetalle = () => {
  return (
    <>
      <Link to="/peliculas" className="flecha link">
        <i className="fas fa-arrow-left"></i>
      </Link>
      <div className="contenedor-peli-detalle">
        <figure>
          <img
            src="https://img.freepik.com/foto-gratis/primer-disparo-flor-morada_181624-25863.jpg?size=626&ext=jpg"
            alt="Imagen de Plicula"
            className="imagen-pelicula-detalle"
          />
        </figure>
        <section className="contenedor-detalle">
          <h3 className="titulo-peli-detalle">Titulo</h3>
          <section className="datos-peli">
            <div className="dato lenguaje">
              <p className="item">Lenguaje:</p>
              <p>Epañol</p>
            </div>
            <div className="dato generos">
              <p className="item">Géneros:</p>
              <p>Drama</p>
            </div>
            <div className="dato estreno">
              <p className="item">Fecha de estreno:</p>
              <p>2021</p>
            </div>
          </section>
          <h3 className="titulo-peli-detalle sinopsis">Sinopsis</h3>
          <p className="sinopsis-texto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod quae
            maiores reiciendis asperiores explicabo consequuntur a fuga.
            Similique, harum atque. Beatae pariatur, excepturi modi aut illum
            necessitatibus dolorum nisi? Sunt.
          </p>
        </section>
      </div>
    </>
  );
};

export default PeliDetalle;
