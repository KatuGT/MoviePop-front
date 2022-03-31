import "./Error404.css";
import logoError from "../../Imagenes/logo-movie-pop-404.svg";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="contenedor-error">
      <img src={logoError} alt="logo-error-404" />
      <span>Pagina no encontrada</span>
      <Link to="/">Regresa a la pagina principal</Link>
    </div>
  );
};

export default Error404;
