import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

  const handleLogin = (formData) => {
    console.log(formData);
    reset();
  };
  return (
    <>
      <div className="contenedor-formulario-registro">
        <h3 className="titulo-formulario">Inicia sesión</h3>
        <form className="formulario-registro" onSubmit={handleSubmit(handleLogin)}>
          <div className="email-login">
            <label htmlFor="email">E-mail</label>
            <input type="e-mal" id="email-login" {...register("email")} autoComplete="on" />
            <p className="mensaje-error">{errors.email?.message}</p>
          </div>
          <div className="password">
            <label htmlFor="password-login">Contraseña</label>
            <input type="password" id="password-login" {...register("password")} autoComplete="off" />
            <p className="mensaje-error">{errors.password?.message}</p>
          </div>
          <button className="boton-enviar" type="submit">
            Enviar
          </button>
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
