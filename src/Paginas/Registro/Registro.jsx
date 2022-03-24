import { Link } from "react-router-dom";

const Registro = () => {
  return (
    <div className="contenedor-formulario-registro">
      <h3 className="titulo-formulario">Ingresa tus datos</h3>
      <form className="formulario-registro">
        <div className="apodo">
          <label htmlFor="apodo">Apodo</label>
          <input type="text" id="apodo" />
        </div>
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
        <p>¿Ya estas registrado?</p>
        <Link to="/rl/login" className="link">
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default Registro;
