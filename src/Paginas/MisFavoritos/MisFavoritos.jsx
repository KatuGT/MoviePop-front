import "./MisFavoritos.css";
import { useContext, useEffect, useState } from "react";
import { AutContext } from "../../Context/AutContext";
// import Card from "../../Componentes/Cards/Card";
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
  const [arrayDePeliculas, setArrayDePeliculas] = useState([]);

  useEffect(() => {
    function getPeliculas() {
      const auxArray = [];
      misFavoritosID.forEach((id) => {
        auxArray.push(axios.get(`https://api.tvmaze.com/shows/${id}`));
      });
      Promise.all(auxArray).then((value) => {
        const auxDataArray = value.map((v) => v.data)
        setArrayDePeliculas(auxDataArray);
      });
    }
    getPeliculas();
  }, [misFavoritosID]);

  return (
    <>
      {arrayDePeliculas.map((pelicula, index) => (
        <p className="favorito-resaltar" key={index}>
          {pelicula.name}
        </p>
      ))}
    </>
  );
};

export default MisFavoritos;
