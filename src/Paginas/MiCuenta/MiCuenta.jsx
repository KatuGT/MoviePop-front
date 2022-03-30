import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AutContext } from "../../Context/AutContext";
import "./MiCuenta.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";

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
  }, [usuario?._id, usuario, miCuenta]);

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
    fotoPerfil: yup.string().url("Ingrese un enlace valido."),
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

  //ACTUALIZAR MIS DATOS
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const editContrasenia = watch("editContrasenia");

  const editarCuenta = async (data) => {
    try {
      await axios.put(
        `http://localhost:5002/api/usuario/${usuario._id}`,
        data,
        {
          headers: { token: usuario.accessToken },
        }
      );
      document.getElementById("boton-cerrar").click();
      toast.success("Edicion exitosa!", {
        duration: 4000,
        position: "botton-center",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="contenedor-mi-cuenta">
        {!miCuenta?.fotoPerfil ? (
          <div className="default-foto-perfil">
            {miCuenta.username?.charAt(0)}
          </div>
        ) : (
          <figure className="foto-mi-cuenta">
            <img src={miCuenta.fotoPerfil} alt="Foto-perfil" />
          </figure>
        )}
        <section>
          <div className="info">
            <p className="resaltar">Apodo:</p>
            <p className="apodo">{miCuenta?.username}</p>
          </div>
          <div className="info">
            <p className="resaltar">Email:</p>
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
                  {errors?.username && (
                    <span className="mensaje-error">
                      {errors.username?.message}
                    </span>
                  )}
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
                <div className="condicional-contrasenia">
                  <input
                    id="editContrasenia"
                    type="checkbox"
                    name="editContrasenia"
                    {...register("editContrasenia")}
                  />
                  <label htmlFor="editContrasenia">
                    Deseo editar contraseña
                  </label>
                </div>
                {editContrasenia && (
                  <>
                    <div className="dato-edit">
                      <label htmlFor="contrasenia">Contraseña nueva</label>
                      <input
                        className="nuevaContrasenia"
                        type="password"
                        placeholder="Nueva contraseña"
                        autoComplete="off"
                        id="contrasenia"
                        {...register("password")}
                      />
                      {errors.password && (
                        <span className="mensaje-error">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <div className="dato-edit">
                      <label htmlFor="nuevaContraseniaConf">
                        Confirmación de nueva contraseña
                      </label>
                      <input
                        className="nuevaContraseniaConf"
                        id="nuevaContraseniaConf"
                        type="password"
                        autoComplete="off"
                        placeholder="Repita la contraseña*"
                        {...register("confirmPwd")}
                      />

                      {errors.confirmPwd && (
                        <span className="mensaje-error">
                          {errors.confirmPwd.message}
                        </span>
                      )}
                    </div>
                  </>
                )}
                <button type="submit" className="enviar-edit">                  
                  Enviar
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="boton-cerrar"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default MiCuenta;
