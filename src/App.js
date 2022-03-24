import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Paginas/Home/Home.jsx"
import PeliDetalle from "./Paginas/Pelicula-detalle/PeliDetalle.jsx";
import Peliculas from "./Paginas/Peliculas/Peliculas.jsx"
import Login from "./Paginas/Registro/Login.jsx";
import LoginRegistro from "./Paginas/Registro/LoginRegistro.jsx";
import Registro from "./Paginas/Registro/Registro.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="peliculas" element={<Peliculas/>}/>
          <Route path="rl" element={<LoginRegistro/>}>
            <Route path="registro" element={<Registro/>}/>
            <Route path="login" element={<Login/>}/>
          </Route>
          <Route path="detalle" element={<PeliDetalle/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
