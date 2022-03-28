import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AutContext } from "../../Context/AutContext";
import "./MiCuenta.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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
  const esquemaActualisacionUsuario = Yup.object().shape({
    username: Yup.string()
      .required("El campo es requerido.")
      .min(4, "Debe tener almenos 4 caracteres.")
      .max(15, "Debe tener como máximo 15 caracteres."),
    email: Yup.string()
      .required("El campo es requerido.")
      .email("Introdusca un Email valido."),
    esAdmin: Yup.boolean().required("El campo es requerido."),
    editContrasenia: Yup.boolean(),
    password: Yup.string().when("editContrasenia", {
      is: true,
      then: Yup.string()
        .required("El campo es requerido.")
        .min(8, "La contraseña debe tener almenos 8 caracteres.")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "No cumple con lo requisitos."
        ),
    }),
    confirmPwd: Yup.string().when("editContrasenia", {
      is: true,
      then: Yup.string()
        .required("El campo es requerido.")
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden."),
    }),
  });

  const opcionesActualisacion = {
    resolver: yupResolver(esquemaActualisacionUsuario),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm(opcionesActualisacion);

  const editContrasenia = watch("editContrasenia");

  //ACTUALIZAR MIS DATOS
  async function actualizarUsuario(formData) {
    
      console.log(formData);
      await axios.put(
        `http://localhost:5002/api/usuario/${usuario._id}`,
        {formData},
        {
          headers: { token: usuario.accessToken },
        }
      );
    

    window.location.reload();
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
                Editar mi usuario
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(actualizarUsuario)}>
                <div className="dato-edit">
                  <label htmlFor="apodo">Apodo</label>
                  <input
                    id="apodo"
                    type="text"
                    {...register("username")}
                    defaultValue={miCuenta?.username}
                  />
                  {errors.username && (
                    <p className="mensaje-error">{errors.username.message}</p>
                  )}
                </div>
                <div className="dato-edit">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    defaultValue={miCuenta?.email}
                  />
                  {errors.email && (
                    <p className="mensaje-error">{errors.email.message}</p>
                  )}
                </div>
                <div className="dato-edit">
                  <label htmlFor="foto-perfil">Foto de Perfil</label>
                  <input
                    id="foto-perfil"
                    type="url"
                    defaultValue={miCuenta?.fotoPerfil}
                    {...register("fotoPerfil")}
                  />
                  {errors.fotoPerfil && (
                    <p className="mensaje-error">{errors.fotoPerfil.message}</p>
                  )}
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
                    <div className="dato-edit contrasenia-edit">
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
                        <p className="mensaje-error">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="dato-edit contrasenia-edit-confirm">
                      <label htmlFor="nuevaContraseniaConf">
                        Confirmación de nueva contraseña
                      </label>
                      <input
                        defaultValue={miCuenta?.password}
                        className="nuevaContraseniaConf"
                        id="nuevaContraseniaConf"
                        type="password"
                        autoComplete="off"
                        placeholder="Repita la contraseña*"
                        {...register("confirmPwd")}
                      />

                      {errors.confirmPwd && (
                        <p className="mensaje-error">
                          {errors.confirmPwd.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
                <button type="submit"  className="btn btn-primary">
                  Enviar
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiCuenta;
