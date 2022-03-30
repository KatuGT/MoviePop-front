import "./ListaUsuarios.css";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
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
        .get(`http://localhost:5002/api/usuario`, {
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
        `http://localhost:5002/api/usuario/${usuarioSelect._id}`,
        data,
        {
          headers: { token: usuario.accessToken },
        }
      );
      getUsuarios()
      document.getElementById("boton-cerrar").click();
      toast.success("Edicion exitosa!", {
        duration: 4000,
        position: "botton-center",
      });
    } catch (error) {
      console.log(error);
    }
  };

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
                className="foto-perfil"
                src={params.row.avatar}
                alt="avatar"
              />
            ) : (
              <i className="fas fa-user-circle"></i>
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
              data-bs-target="#staticBackdrop"
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
        .get(`http://localhost:5002/api/usuario/find/${id}`)
        .then((res) => {
          setUsuarioSelect(res.data);
        });
    } catch (error) {
      console.log();
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
      } catch (error) {
        console.log(error);
      }
    }
    toast.error("Usuario borrado permanentemente.", {
      position: "bottom-center",
      style: { backgroundColor: "#FA392D", color: "#fff" },
    });
  };

  return (
    <div className="contenedor-data-grid">
      <div className="data-grid" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
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
                  <label htmlFor="username-edit-lista">Apodo</label>
                  <input
                    {...register("username")}
                    id="username-edit-lista"
                    defaultValue={usuarioSelect?.username}
                  />
                  {errors.username && (
                    <span className="mensaje-error">
                      {errors.username?.messaje}
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
