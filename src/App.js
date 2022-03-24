import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Paginas/Home/Home.jsx"
import Login from "./Paginas/Login/Login.jsx";
import Peliculas from "./Paginas/Peliculas/Peliculas.jsx"
import Registro from "./Paginas/Registro/Registro.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="peliculas" element={<Peliculas/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="singin" element={<Registro/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
