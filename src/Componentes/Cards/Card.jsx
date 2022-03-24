import { Link } from "react-router-dom";
import "./Card.css";

const Card = () => {
  return (
    <Link to="/detalle" className="link">
      <div className="card-pelicula">
        <img
          src="https://img.freepik.com/foto-gratis/primer-disparo-flor-morada_181624-25863.jpg?size=626&ext=jpg"
          alt="Imagen de Plicula"
          className="imagen-pelicula"
        />
        <h4 className="titulo-pelicula">Pelicula</h4>
      </div>
    </Link>
  );
};

export default Card;
