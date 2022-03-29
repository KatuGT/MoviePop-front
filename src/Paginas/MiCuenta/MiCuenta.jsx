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
  const esquemaActualisacionUsuario = yup.object().shape({
    username: yup
      .string()
      .required("El campo es requerido.")
      .min(4, "Debe tener almenos 4 caracteres.")
      .max(15, "Debe tener como máximo 15 caracteres."),
    email: yup
      .string()
      .required("El campo es requerido.")
      .email("Introdusca un Email valido."),
    fotoPerfil: yup.string().url("Introdusca un link valido."),
    esAdmin: yup.boolean().required("El campo es requerido."),
    editContrasenia: yup.boolean(),
    password: yup.string().when("editContrasenia", {
      is: true,
      then: yup
        .string()
        .required("El campo es requerido.")
        .min(8, "La contraseña debe tener almenos 8 caracteres.")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "No cumple con lo requisitos."
        ),
    }),
    confirmPwd: yup.string().when("editContrasenia", {
      is: true,
      then: yup
        .string()
        .required("El campo es requerido.")
        .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden."),
    }),
  });

  const {
    register,
    handleSubmit,
    
    watch,
  } = useForm({ resolver: yupResolver(esquemaActualisacionUsuario) });

  const editContrasenia = watch("editContrasenia");

  //ACTUALIZAR MIS DATOS
   function editarUsuario(formData) {
         console.log(formData);
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
      <form onSubmit={handleSubmit(editarUsuario)}>
        <input type="text" {...register("username")}   />
        <button type="submit"> enviar</button>
      </form>
    </>
  );
};

export default MiCuenta;
