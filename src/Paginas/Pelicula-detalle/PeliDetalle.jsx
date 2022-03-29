import "./PeliDetalle.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cargando from "../../Imagenes/cargando.svg";
import { AutContext } from "../../Context/AutContext";
import { useContext } from "react";

const PeliDetalle = () => {
  let { id } = useParams();
  const [pelicula, setPelicula] = useState([]);

  useEffect(() => {
    const getPelicula = async () => {
      try {
        const pelicula = await Axios.get(`https://api.tvmaze.com/shows/${id}`);
        setPelicula(pelicula.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPelicula();
  }, [id]);

  //agregar a favoritos
  const { usuario } = useContext(AutContext);

  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };

  async function agregarBorrarFav(idPelicula) {
    try {
      if (isChecked) {
        await Axios.post(
          `http://localhost:5002/api/usuario/${usuario?._id}/addfavorito/${idPelicula}`
        );
      } else {
        await Axios.delete(
          `http://localhost:5002/api/usuario/${usuario?._id}/borrarpelicula/${idPelicula}`
        );
      }
    } catch (error) {
      console.log();
    }
  }

  return (
    <>
      <Link to="/peliculas" className="flecha link">
        <i className="fas fa-arrow-left"></i>
      </Link>
      <div className="contenedor-peli-detalle">
        <figure>
          <img
            src={pelicula.image?.original || Cargando}
            alt="Imagen de Plicula"
            className="imagen-pelicula-detalle"
          />
        </figure>
        <section className="contenedor-detalle">
          <h3 className="titulo-peli-detalle">{pelicula?.name}</h3>
          <section className="datos-peli">
            <div className="dato lenguaje">
              <p className="item">Lenguaje:</p>
              <p>{pelicula?.language}</p>
            </div>
            <div className="dato generos">
              <p className="item">Géneros:</p>
              <ul>
                {pelicula.genres?.map((genero, index) => (
                  <li key={index}>{genero}</li>
                ))}
              </ul>
            </div>
            <div className="dato estreno">
              <p className="item">Fecha de estreno:</p>
              <p>{pelicula?.premiered}</p>
            </div>
            <div className="dato sitio-oficial">
              <p className="item">Sitio oficial:</p>
              <a
                className="link-sitio-oficial"
                rel="noopener noreferrer"
                target="_blank"
                href={pelicula?.officialSite}
              >
                {pelicula?.officialSite}
              </a>
            </div>
            <div className="dato tipo">
              <p className="item">Tipo:</p>
              {pelicula?.type}
            </div>
          </section>
          <h3 className="titulo-peli-detalle sinopsis">Sinopsis</h3>
          <p className="sinopsis-texto">{pelicula?.summary}</p>
          <div className="contenedor-favoritos">
            <input
              id={`peli${id}`}
              type="checkbox"
              onChange={handleOnChange}
              checked={isChecked}
            />
            {isChecked ? (
              <label className="agregarFav" htmlFor={`peli${id}`} onClick={() => agregarBorrarFav(id)}>
                <i className="far fa-heart"></i>
                <p>Agregar favoritos</p>
              </label>
            ) : (
              <label className="quitarFav" htmlFor={`peli${id}`} onClick={() => agregarBorrarFav(id)}>
                <i className="fas fa-heart "></i>
                <p>Quitar de favoritos</p>
              </label>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default PeliDetalle;
