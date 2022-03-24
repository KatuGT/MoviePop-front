import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Registro = () => {
  const schema = yup.object().shape({
    apodo: yup
      .string()
      .required("Este campo es obligatorio")
      .min(4, "Debe tener almenos 4 caracteres.")
      .max(15, "Debe tener como máximo 15 caracteres."),
    email: yup
      .string()
      .email("ingrese un e-mail valido.")
      .required("Este campo es obligatorio"),
    password: yup
      .string()
      .required("Este campo es obligatorio")
      .min(8, "Debe tener almenos 8 caracteres")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Almenos debe tener 1 letra y 1 numero"),
    confirmPassword: yup
      .string()
      .required("Este campo es obligatorio")
      .oneOf([yup.ref("password")], "Las contraseñas deben coincidir."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const handleRegistro = (formData) => {
    console.log(formData);
    reset();
  };

  return (
    <div className="contenedor-formulario-registro">
      <h3 className="titulo-formulario">Ingresa tus datos</h3>
      <form
        className="formulario-registro"
        onSubmit={handleSubmit(handleRegistro)}
      >
        <div className="apodo">
          <label htmlFor="apodo">Apodo</label>
          <input
            type="text"
            id="apodo"
            {...register("apodo")}
            placeholder="Pepito2021"
          />
          <p className="mensaje-error">{errors.apodo?.message}</p>
        </div>
        <div className="email">
          <label htmlFor="email">E-mail</label>
          <input
            type="e-mal"
            id="email"
            {...register("email")}
            placeholder="ejemplo@gmail.com"
          />
          <p className="mensaje-error">{errors.email?.message}</p>
        </div>
        <div className="password">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="*******"
            {...register("password")}
            autoComplete="off"
          />
          <p className="mensaje-error">{errors.password?.message}</p>
        </div>
        <div className="passwordConfirmacion">
          <label htmlFor="confirmpassword">Confirmacion de contraseña</label>
          <input
            type="password"
            id="confirmpassword"
            placeholder="Vuelve a escribir tu contraseña."
            {...register("confirmPassword")}
            autoComplete="off"
          />
          <p className="mensaje-error">{errors.confirmPassword?.message}</p>
        </div>
        <button className="boton-enviar" type="submit">
          Enviar
        </button>
      </form>
      <div className="registrado">
        <p>¿Ya estas registrado?</p>
        <Link to="/rl/login" className="link">
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default Registro;
