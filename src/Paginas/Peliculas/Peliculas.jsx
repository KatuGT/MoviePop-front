import Navbar from "./../../Componentes/Navbar/Navbar";
import "./Peliculas.css";
import Card from "./../../Componentes/Cards/Card.jsx";
import { useEffect, useState } from "react";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cargando from "../../Imagenes/cargando.svg";

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  //Busqueda
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      const queryArray = query ? query.split(" ") : null;

      const newQuery = query ? queryArray.join("%20") : null;
      Axios.get(
        !query
          ? `https://api.tvmaze.com/shows?page=${pagina}`
          : `https://api.tvmaze.com/search/shows?q=${newQuery}
      `
      ).then((res) => {
        if (!query) {
          setPeliculas((prevPeliculas) => prevPeliculas.concat(res.data));
          setHasMore(res.data.totalPages >= res.pageToLoad);
        } else {
          const auxArray = res.data.map((pelicula) => {
            return pelicula.show;
          });
          setPeliculas(auxArray);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [pagina, query]);

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
          loader={
            <img
              className="cargando-peliculas"
              src={Cargando}
              alt="icono cargando"
            />
          }
          hasMore={hasMore}
        >
          {peliculas?.map((pelicula, index) => (
            <Card pelicula={pelicula} key={index} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Peliculas;
