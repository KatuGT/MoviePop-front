import "./MisFavoritos.css";
import { useContext, useEffect, useState } from "react";
import { AutContext } from "../../Context/AutContext";
// import Card from "../../Componentes/Cards/Card";
import axios from "axios";
import Card from "../../Componentes/Cards/Card";

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
  }, [usuario?._id, usuario, misFavoritosID]);

  //GET PELICULAS
  const [arrayDePeliculas, setArrayDePeliculas] = useState([]);

  function getPeliculas() {
    const auxArray = [];
    misFavoritosID.forEach((id) => {
      auxArray.push(axios.get(`https://api.tvmaze.com/shows/${id}`));
    });
    Promise.all(auxArray).then((value) => {
      const auxDataArray = value.map((v) => v.data);
      setArrayDePeliculas(auxDataArray);
    });
  }

  useEffect(() => {
    getPeliculas();
  }, [misFavoritosID]);

  //borrar de favorito
  async function BorrarFav(idPelicula) {
    try {
      await axios.delete(
        `http://localhost:5002/api/usuario/${usuario?._id}/borrarpelicula/${idPelicula}`
      );
      getPeliculas()
    } catch (error) {
      console.log();
    }
  }

  return (
    <section className="contenedor-card">
      {arrayDePeliculas.map((pelicula, index) => (
        <div key={index}>
          <Card
            id={pelicula.id}
            image={pelicula?.image.original}
            name={pelicula?.name}
          />
          <i
            className="fas fa-minus-circle"
            onClick={() => BorrarFav(pelicula.id)}
          ></i>
        </div>
      ))}
    </section>
  );
};

export default MisFavoritos;
