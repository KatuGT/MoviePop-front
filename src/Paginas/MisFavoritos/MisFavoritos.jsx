import "./MisFavoritos.css";
import { useContext, useEffect, useState } from "react";
import { AutContext } from "../../Context/AutContext";
import axios from "axios";


const MisFavoritos = () => {

  const { usuario } = useContext(AutContext);

  //GET USUARIO
  const [misFavoritos, setMisFavoritos] = useState([]);

  useEffect(() => {
    async function getUsuario() {
      try {
        if (usuario !== null) {
          const datosUsuarios = await axios.get(
            `http://localhost:5002/api/usuario/find/${usuario?._id}`
          );
          setMisFavoritos(datosUsuarios?.data.favoritos);
        } else {
          setMisFavoritos([]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUsuario();
  }, [usuario?._id, usuario]);


  return (
    <div className='favorito-resaltar'>{misFavoritos.map((favorito, index) =>
      <p key={index}>{favorito}</p>
    )}</div>
  )
}

export default MisFavoritos