import { Link } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
  return (
    <Link to={{ pathname: `/detalle/${props.pelicula.show?.id}` }} className="link">
      <div className="card-pelicula">
        <img
          src={props.pelicula.show.image?.original}
          alt="Imagen de Plicula"
          className="imagen-pelicula"
        />
        <h4 className="titulo-pelicula">{props.pelicula.show?.name}</h4>
      </div>
    </Link>
  );
};

export default Card;
