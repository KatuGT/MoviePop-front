import "./ListaUsuarios.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AutContext } from "../../Context/AutContext";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
const ListaUsuarios = () => {
  const { usuario } = useContext(AutContext);

  //GET TODOS LOS UDUARIOS
  const [usuarios, setUsuarios] = useState([]);

  const getUsuarios = async () => {
    try {
      await axios
        .get(`https://movie-pop-back.herokuapp.com/api/usuario`, {
          headers: { token: usuario.accessToken },
        })
        .then((res) => setUsuarios(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  //Validacion editar usuario
  const schemaEditar = yup.object().shape({
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
    esAdmin: yup.boolean().required("Seleccione una opcion."),
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
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaEditar) });
  const editContrasenia = watch("editContrasenia");

  //ACTUALIZAR USUARIO
  const editarUsuario = async (data) => {
    try {
      await axios.put(
        `https://movie-pop-back.herokuapp.com/api/usuario/${usuarioSelect._id}`,
        data,
        {
          headers: { token: usuario.accessToken },
        }
      );
      getUsuarios();
      document.getElementById("boton-cerrar").click();
      toast.success("Edicion exitosa!", {
        duration: 4000,
        position: "botton-center",
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  //Validacion agregar usuario
  const schemaAgregar = yup.object().shape({
    username: yup
      .string()
      .required("Este campo es obligatorio")
      .min(4, "Debe tener almenos 4 caracteres.")
      .max(15, "Debe tener como máximo 15 caracteres."),
    email: yup
      .string()
      .email("ingrese un e-mail valido.")
      .required("Este campo es obligatorio"),
    fotoPerfil: yup.string().url("ingrese un enlace valido."),
    esAdmin: yup.boolean().required("Seleccione una opcion."),
    password: yup
      .string()
      .required("Este campo es obligatorio")
      .min(8, "Debe tener almenos 8 caracteres")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Almenos debe tener 1 letra y 1 numero"
      ),
    confirmPassword: yup
      .string()
      .required("Este campo es obligatorio")
      .oneOf([yup.ref("password")], "Las contraseñas deben coincidir."),
  });

  const {
    register: registerAgregar,
    handleSubmit: handleSubmitAgregar,
    formState: { errors: errorsAgregar },
    reset: resetAgregar,
  } = useForm({ resolver: yupResolver(schemaAgregar) });

  //AGREGAR USUARIO
  const [error, setError] = useState(false);

  const agregarUsuario = async (data) => {
    setError(false);
    try {
      await axios.post("http://localhost:5002/api/aut/register", data);
      toast.success("Usuario creado!", {
        duration: 4000,
        position: "botton-center",
      });
      resetAgregar();
      getUsuarios();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  //FLAS TABLAS
  const rows = usuarios.map((usuario) => {
    const listaActual = {
      id: usuario._id,
      apodo: usuario.username,
      email: usuario.email,
      avatar: usuario.fotoPerfil,
      favoritos: usuario.favoritos,
      esAdmin: usuario.esAdmin ? "Admin" : "Usuario",
    };
    return listaActual;
  });

  //COLUMNAS TABLAS
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "apodo",
      headerName: "Apodo",
      width: 200,
      renderCell: (params) => {
        return (
          <figure className="nombre-foto-row">
            {params.row.avatar !== "" ? (
              <img
                className="foto-perfil-lista"
                src={params.row.avatar}
                alt="avatar"
              />
            ) : (
              <>
                <span className="default-foto-lista">
                  {params.row.apodo.charAt(0)}
                </span>
              </>
            )}

            {params.row.apodo}
          </figure>
        );
      },
    },
    { field: "email", headerName: "E-mail", width: 200 },
    { field: "favoritos", headerName: "Favoritos", width: 200 },
    {
      field: "esAdmin",
      headerName: "Rol",
      width: 130,
    },
    {
      field: "accion",
      headerName: "Acciones",
      width: 160,
      renderCell: (params) => {
        return (
          // BOTON EDITAR
          <div className="acciones">
            <button
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#editarUsuario"
              onClick={() => findUsuarioEditar(params.row.id)}
            >
              <i className="fas fa-user-edit"></i>
            </button>

            {/* BOTON BORRAR */}
            <i
              className="fas fa-trash-alt"
              onClick={() => borrarItem(params.row.id)}
            ></i>
          </div>
        );
      },
    },
  ];

  const [usuarioSelect, setUsuarioSelect] = useState([]);
  const findUsuarioEditar = async (id) => {
    try {
      await axios
        .get(`https://movie-pop-back.herokuapp.com/api/usuario/find/${id}`)
        .then((res) => {
          setUsuarioSelect(res.data);
        });
    } catch (error) {
      console.log();
    }
  };

  ///borrar usuario
  const borrarItem = async (id) => {
    if (
      window.confirm("¿Estas seguro de borrar este usuario? Es Permanente.")
    ) {
      try {
        await axios.delete(`http://localhost:5002/api/usuario/${id}`, {
          headers: { token: usuario.accessToken },
        });
        getUsuarios();
        toast.error("Usuario borrado permanentemente.", {
          position: "bottom-center",
          style: { backgroundColor: "#FA392D", color: "#fff" },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="contenedor-data-grid">
      <button
        className="agregar-usuario"
        data-bs-toggle="modal"
        data-bs-target="#agregarUsuario"
      >
        Agregar nuevo
      </button>
      <div className="data-grid" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
      {/* MODAL EDITAR USUARIO */}
      <div
        className="modal fade"
        id="editarUsuario"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="editarUsuario"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(editarUsuario)}>
                <div className="dato-edit">
                  <label htmlFor="username-edit-lista">Apodo</label>
                  <input
                    {...register("username")}
                    id="username-edit-lista"
                    defaultValue={usuarioSelect?.username}
                  />
                  {errors.username && (
                    <span className="mensaje-error">
                      {errors.username?.message}
                    </span>
                  )}
                </div>
                <div className="dato-edit">
                  <label htmlFor="edit-email-lista">E-mail</label>
                  <input
                    type="email"
                    {...register("email")}
                    id="edit-email-lista"
                    defaultValue={usuarioSelect?.email}
                  />
                </div>
                <div className="dato-edit">
                  <label htmlFor="edit-foto-lista">Imagen de Perfil</label>
                  <input
                    type="url"
                    {...register("fotoPerfil")}
                    id="edit-foto-lista"
                  />
                </div>
                <div className="dato-edit">
                  <p>Rol:</p>
                  <div className="rol">
                    <input
                      type="radio"
                      {...register("esAdmin")}
                      id="rolUserEdit"
                      value="false"
                      defaultChecked={true}
                    />
                    <label htmlFor="rolUserEdit">Usuario</label>
                  </div>
                  <div className="rol">
                    <input
                      type="radio"
                      {...register("esAdmin")}
                      id="roladminEdit"
                      value="true"
                    />
                    <label htmlFor="roladminEdit">Admin</label>
                  </div>
                  {errors.esAdmin && (
                    <span className="mensaje-error">
                      {errors.esAdmin.message}
                    </span>
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
                    <div className="dato-edit">
                      <label htmlFor="contrasenia-lista">
                        Contraseña nueva
                      </label>
                      <input
                        className="nuevaContrasenia"
                        type="password"
                        placeholder="Nueva contraseña"
                        autoComplete="off"
                        id="contrasenia-lista"
                        {...register("password")}
                      />
                      {errors.password && (
                        <span className="mensaje-error">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <div className="dato-edit">
                      <label htmlFor="nuevaContraseniaLista">
                        Confirmación de nueva contraseña
                      </label>
                      <input
                        className="nuevaContraseniaConf"
                        id="nuevaContraseniaLista"
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
                onClick={() => {
                  reset();
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL EDITAR USUARIO */}
      <div
        className="modal fade"
        id="agregarUsuario"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ingrese los datos
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitAgregar(agregarUsuario)}>
                <div className="dato-edit">
                  <label htmlFor="username-nuevo">Apodo</label>
                  <input id="username-nuevo" {...registerAgregar("username")} />
                  {errorsAgregar.username && (
                    <span className="mensaje-error">
                      {errorsAgregar.username.message}
                    </span>
                  )}
                </div>
                <div className="dato-edit">
                  <label htmlFor="email-nuevo">E-mail</label>
                  <input
                    type="email"
                    id="email-nuevo"
                    {...registerAgregar("email")}
                  />
                  {errorsAgregar.email && (
                    <span className="mensaje-error">
                      {errorsAgregar.email.message}
                    </span>
                  )}
                </div>
                <div className="dato-edit">
                  <label htmlFor="foto-nueva">Imagen de Perfil</label>
                  <input
                    type="url"
                    id="foto-nueva"
                    {...registerAgregar("fotoPerfil")}
                  />
                </div>
                <div className="dato-edit">
                  <p>Rol:</p>
                  <div className="rol">
                    <input
                      type="radio"
                      {...registerAgregar("esAdmin")}
                      id="rolUserCrear"
                      value="false"
                      defaultChecked={true}
                    />
                    <label htmlFor="rolUserCrear">Usuario</label>
                  </div>
                  <div className="rol">
                    <input
                      type="radio"
                      {...registerAgregar("esAdmin")}
                      id="rolAdminCrear"
                      value="true"
                    />
                    <label htmlFor="rolAdminCrear">Admin</label>
                  </div>
                  {errors.esAdmin && (
                    <span className="mensaje-error">
                      {errors.esAdmin.message}
                    </span>
                  )}
                </div>
                <div className="dato-edit">
                  <label htmlFor="contrasenia-nueva">Contraseña</label>
                  <input
                    className="nuevaContrasenia"
                    type="password"
                    placeholder="Nueva contraseña"
                    autoComplete="off"
                    id="contrasenia-nueva"
                    {...registerAgregar("password")}
                  />
                  {errorsAgregar.password && (
                    <span className="mensaje-error">
                      {errorsAgregar.password.message}
                    </span>
                  )}
                </div>
                <div className="dato-edit">
                  <label htmlFor="contrasenia-conf-nueva">
                    Confirmación de contraseña
                  </label>
                  <input
                    className="nuevaContraseniaConf"
                    id="contrasenia-conf-nueva"
                    type="password"
                    autoComplete="off"
                    placeholder="Repita la contraseña*"
                    {...registerAgregar("confirmPassword")}
                  />
                  {errorsAgregar.confirmPwd && (
                    <span className="mensaje-error">
                      {errorsAgregar.confirmPwd.message}
                    </span>
                  )}
                </div>
                <button type="submit" className="enviar-edit">
                  Enviar
                </button>
                {error && (
                  <p className="mensaje-error">
                    Puede que el apodo o email ya esten en uso.
                  </p>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  resetAgregar();
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default ListaUsuarios;
