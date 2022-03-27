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

function App() {
  const user = false;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            index
            element={!user ? <Navigate to="/rl/login" /> : <Home />}
          />
          <Route
            path="peliculas"
            element={!user ? <Navigate to="/rl/login" /> : <Peliculas />}
          />
          <Route path="rl" element={<LoginRegistro />}>
            <Route
              path="registro"
              element={user ? <Navigate to="/" /> : <Registro />}
            />
            <Route
              path="login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
          </Route>
          <Route
            path="detalle/:id"
            element={!user ? <Navigate to="/rl/login" /> : <PeliDetalle />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
