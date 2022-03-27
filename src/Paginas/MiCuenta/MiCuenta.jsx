import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AutContext } from "../../Context/AutContext";
import "./MiCuenta.css";

const MiCuenta = () => {
  const { usuario } = useContext(AutContext);

  //GET USUARIO
  const [miCuenta, setMiCuenta] = useState([]);

  useEffect(() => {
    async function getUsuario() {
      try {
        if (usuario !== null) {
          const datosUsuarios = await axios.get(
            `http://localhost:5002/api/usuario/find/${usuario?._id}`
          );
          setMiCuenta(datosUsuarios?.data);
        } else {
          setMiCuenta([]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUsuario();
  }, [usuario?._id, usuario]);

  return (
    <section className="contenedor-mi-cuenta">
      <div className="default-foto-perfil">
        {miCuenta.username?.charAt(0)}
      </div>
      {/* <figure>
        <img src={miCuenta.fotoPerfil} alt="Foto-perfil" />
      </figure> */}
      <section>
        <div className="info">
          <p className="resaltar">Apodo:</p>
          <p className="apodo">{miCuenta?.username}</p>
        </div>
        <div className="info">
          <p className="resaltar">E-mail:</p>
          <p className="apodo">{miCuenta?.email}</p>
        </div>
        <div className="info">
          <p className="resaltar">Rol:</p>
          <p className="apodo">{miCuenta?.esAdmin ? "Administrador" : "Usuario"}</p>
        </div>
        <button className="editar-datos">Editar mis datos</button>
      </section>
    </section>
  );
};

export default MiCuenta;
