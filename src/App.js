import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Paginas/Home/Home.jsx";
import PeliDetalle from "./Paginas/Pelicula-detalle/PeliDetalle.jsx";
import Peliculas from "./Paginas/Peliculas/Peliculas.jsx";
import Login from "./Paginas/Registro/Login.jsx";
import LoginRegistro from "./Paginas/Registro/LoginRegistro.jsx";
import Registro from "./Paginas/Registro/Registro.jsx";

function App() {
  const user = true;
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
