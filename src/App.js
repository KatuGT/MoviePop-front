import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Paginas/Home/Home.jsx";
import PeliDetalle from "./Paginas/Pelicula-detalle/PeliDetalle.jsx";
import Peliculas from "./Paginas/Peliculas/Peliculas.jsx";
import Login from "./Paginas/LoginRegistro/Login.jsx";
import LoginRegistro from "./Paginas/LoginRegistro/LoginRegistro.jsx";
import Registro from "./Paginas/LoginRegistro/Registro.jsx";
import { AutContext } from "./Context/AutContext.js";
import { useContext } from "react";

function App() {
  const { usuario } = useContext(AutContext);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            index
            element={!usuario ? <Navigate to="/rl/login" /> : <Home />}
          />
          <Route
            path="peliculas"
            element={!usuario ? <Navigate to="/rl/login" /> : <Peliculas />}
          />
          <Route path="rl" element={<LoginRegistro />}>
            <Route
              path="registro"
              element={usuario ? <Navigate to="/" /> : <Registro />}
            />
            <Route
              path="login"
              element={usuario ? <Navigate to="/" /> : <Login />}
            />
          </Route>
          <Route
            path="detalle/:id"
            element={!usuario ? <Navigate to="/rl/login" /> : <PeliDetalle />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
