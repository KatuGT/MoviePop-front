import Navbar from "./../../Componentes/Navbar/Navbar";
import "./Peliculas.css";
import Card from "./../../Componentes/Cards/Card.jsx";
import { useEffect, useState } from "react";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cargando from "../../Imagenes/cargando.svg"

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [pagina, setPagina] = useState(1);
  useEffect(() => {
    try {
      Axios.get(`https://api.tvmaze.com/shows?page=${pagina}`).then((res) =>
        setPeliculas((prevPeliculas) => prevPeliculas.concat(res.data))
      );
    } catch (error) {
      console.log(error);
    }
  }, [pagina]);
  console.log(pagina);

  //Busqueda
  const [query, setQuery] = useState("");
  return (
    <>
      <Navbar />
      <div className="contenedor-peliculas">
        <div className="contenedor-buscador">
          <input
            type="search"
            placeholder="Buscar"
            className="buscador-peliculas"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>
        <h2 className="encabezado-peliculas">Películas</h2>
        <div className="separador"></div>
        <InfiniteScroll
          dataLength={peliculas.length}
          className="contenedor-card"
          next={() => setPagina((prevPagina) => prevPagina + 1)}
          loader={<img src={Cargando} alt="icono cargando"/>}
          hasMore={true}
          endMessage={
            <p className="sin-peliculas">
              <b>No hay elemento para ver.</b>
            </p>
          }
        >
          {peliculas
            .filter((pelicula) => pelicula?.name.toLowerCase().includes(query))
            .map((pelicula, index) => (
              <Card pelicula={pelicula} key={index} /> || <Cargando/>
            ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Peliculas;
