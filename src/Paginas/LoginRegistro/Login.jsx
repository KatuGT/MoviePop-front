import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { AutContext } from "../../Context/AutContext";
import axios from "axios";

//VALIDACIONES
const Login = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("ingrese un e-mail valido.")
      .required("Este campo es obligatorio"),
    password: yup
      .string()
      .required("Este campo es obligatorio")
      .min(8, "Debe tener almenos 8 caracteres")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Almenos debe tener 1 letra y 1 numero"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const { dispatch } = useContext(AutContext);
  const [loginError, setLoginError] = useState(false);
  async function handleLogin(formData) {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `https://movie-pop-back.herokuapp.com/api/aut/login`,
        formData
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      reset();
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL" });
      setLoginError(error)
    }
  }
  return (
    <>
      <div className="contenedor-formulario-registro">
        <h3 className="titulo-formulario">Inicia sesión</h3>
        <form
          className="formulario-registro"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="email-login">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email-login"
              {...register("email")}
              autoComplete="on"
            />
            <p className="mensaje-error">{errors.email?.message}</p>
          </div>
          <div className="password">
            <label htmlFor="password-login">Contraseña</label>
            <input
              type="password"
              id="password-login"
              {...register("password")}
              autoComplete="off"
            />
            <p className="mensaje-error">{errors.password?.message}</p>
          </div>
          <button className="boton-enviar" type="submit">
            Enviar
          </button>
          {loginError && <p className="mensaje-error">Email o contraseña incorrecta.</p>}
        </form>
        <div className="registrado">
          <p>¿No tenes cuenta?</p>
          <Link to="/rl/registro" className="link">
            Registrate
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
