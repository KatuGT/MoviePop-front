import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AutContext } from "../../Context/AutContext";
import "./MiCuenta.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

  //Validacion
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Este campo es obligatorio")
      .min(4, "Debe tener almenos 4 caracteres.")
      .max(15, "Debe tener como máximo 15 caracteres."),
    email: yup
      .string()
      .email("Ingrese un e-mail valido.")
      .required("Este campo es obligatorio"),
    fotoPerfil: yup
      .string()
      .url("Ingrese un enlace valido.")
  });

  // const editContrasenia = watch("editContrasenia");

  //ACTUALIZAR MIS DATOS
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const editarCuenta = async (data) => {
    try {
      await axios.put(`http://localhost:5002/api/usuario/${usuario._id}`, data,{
        headers: { token:usuario.accessToken}
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="contenedor-mi-cuenta">
        {!miCuenta?.fotoPerfil ? (
          <div className="default-foto-perfil">
            {miCuenta.username?.charAt(0)}
          </div>
        ) : (
          <figure>
            <img src={miCuenta.fotoPerfil} alt="Foto-perfil" />
          </figure>
        )}
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
            <p className="apodo">
              {miCuenta?.esAdmin ? "Administrador" : "Usuario"}
            </p>
          </div>
          <button
            type="button"
            className="editar-datos"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Editar <i className="fas fa-user-edit"></i>
          </button>
        </section>
      </section>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Editar
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(editarCuenta)}>
                <div className="dato-edit">
                  <label htmlFor="username-edit">Apodo</label>
                  <input
                    defaultValue={miCuenta?.username}
                    {...register("username")}
                    id="username-edit"
                  />
                  {errors.username && (<span className="mensaje-error">{errors.username?.messaje}</span>)}
                </div>
                <div className="dato-edit">
                  <label htmlFor="edit-email">E-mail</label>
                  <input
                    defaultValue={miCuenta?.email}
                    type="email"
                    {...register("email")}
                    id="edit-email"
                  />
                </div>
                <div className="dato-edit">
                  <label htmlFor="edit-foto">Imagen de Perfil</label>
                  <input
                    defaultValue={miCuenta?.fotoPerfil}
                    type="url"
                    {...register("fotoPerfil")}
                    id="edit-foto"
                  />
                </div>
                <input type="submit" />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiCuenta;
