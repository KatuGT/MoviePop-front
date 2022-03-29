import "./MisFavoritos.css";
import { useContext, useEffect, useState } from "react";
import { AutContext } from "../../Context/AutContext";
import Card from "../../Componentes/Cards/Card";
import axios from "axios";

const MisFavoritos = () => {
  const { usuario } = useContext(AutContext);

  //GET USUARIO
  const [misFavoritosID, setMisFavoritosID] = useState([]);

  useEffect(() => {
    async function getUsuario() {
      try {
        if (usuario !== null) {
          const datosUsuarios = await axios.get(
            `http://localhost:5002/api/usuario/find/${usuario?._id}`
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
  }, [usuario?._id, usuario]);

  //GET PELICULAS
  const [peliculas, setPeliculas] = useState([]);
  useEffect(() => {
    async function getFilms() {
      try {
        await axios.get(`https://api.tvmaze.com/shows`).then((res) => {
          setPeliculas(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getFilms();
  }, [setPeliculas]);

  const arrayPeliculaID = [];

  for (let index = 0; index < misFavoritosID.length; index++) {
    const element = misFavoritosID[index];
    const resultFilm = peliculas.filter((i) => i.id === element);
    arrayPeliculaID.push(...resultFilm);
  }

  console.log(arrayPeliculaID);

  return (
    <>
      {misFavoritosID.map((id) => (
        <p className="favorito-resaltar" key={id}>
          {id}
        </p>
      ))}
      {/* {peliculas.map((pelicula) => (
        <p>{pelicula?.name}</p>
      ))} */}
    </>
  );
};

export default MisFavoritos;
