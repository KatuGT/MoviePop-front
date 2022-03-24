import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="contenedor-formulario-registro">
      <h3 className="titulo-formulario">Inicia sesión</h3>
      <form className="formulario-registro">        
        <div className="email">
          <label htmlFor="email">E-mail</label>
          <input type="e-mal" id="email" />
        </div>
        <div className="password">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" />
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
