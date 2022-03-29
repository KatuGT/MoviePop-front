import { Link } from "react-router-dom";
import "./Card.css";
import Cargando from "../../Imagenes/cargando.svg";

const Card = (props) => {
  return (
    
      <Link
        to={{ pathname: `/detalle/${props.pelicula?.id}` }}
        className="link"
      >
        <div className="card-pelicula">
          <img
            src={props.pelicula.image?.original || Cargando}
            alt="Imagen de Plicula"
            className="imagen-pelicula"
          />
          <h4 className="titulo-pelicula">{props.pelicula?.name}</h4>
        </div>
      </Link>
    
  );
};

export default Card;
