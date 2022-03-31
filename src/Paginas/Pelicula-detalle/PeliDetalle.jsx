import "./PeliDetalle.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cargando from "../../Imagenes/cargando.svg";
import { AutContext } from "../../Context/AutContext";
import { useContext } from "react";
import axios from "axios";
// import Rating from "../../Componentes/Rating/Rating";

const PeliDetalle = () => {
  let { id } = useParams();
  const { usuario } = useContext(AutContext);

  const [pelicula, setPelicula] = useState([]);
 
  useEffect(() => {
    const getPelicula = async () => {
      try {
        const pelicula = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setPelicula(pelicula.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPelicula();
  }, [id]);

  console.log(pelicula);

  const [misFavoritosID, setMisFavoritosID] = useState([]);
  useEffect(() => {
    async function getUsuario() {
      try {
        if (usuario !== null) {
          const datosUsuarios = await axios.get(
            `https://movie-pop-back.herokuapp.com/api/usuario/find/${usuario?._id}`
          );
          setMisFavoritosID(datosUsuarios?.data.favoritos);
        } else {
          setMisFavoritosID([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUsuario();
  }, [usuario]);

  const [isChecked, setIsChecked] = useState();

  //agregar a favoritos
  async function agregarBorrarFav(idPelicula) {
    try {
      if (!isChecked) {
        await axios.post(
          `https://movie-pop-back.herokuapp.com/api/usuario/${usuario?._id}/addfavorito/${idPelicula}`
        );
      } else {
        await axios.delete(
          `https://movie-pop-back.herokuapp.com/api/usuario/${usuario?._id}/borrarpelicula/${idPelicula}`
        );
      }
      setIsChecked(!isChecked)
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
            src={pelicula?.image?.original || Cargando}
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
            <input id={`peli${id}`} type="checkbox" checked={isChecked} />
            {isChecked ? (
              <label
                className="agregarFav"
                htmlFor={`peli${id}`}
                onClick={() => agregarBorrarFav(id)}
              >
                <i className="fas fa-heart "></i>
                <p>Quitar de favoritos</p>
              </label>
            ) : (
              <label
                className="quitarFav"
                htmlFor={`peli${id}`}
                onClick={() => agregarBorrarFav(id)}
              >
                <i className="far fa-heart"></i>
                <p>Agregar favoritos</p>
              </label>
            )}
          </div>
          {/* <Rating rating={pelicula?.rating.average}/> */}
        </section>
      </div>
    </>
  );
};

export default PeliDetalle;
