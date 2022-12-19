import React, { useEffect, useState } from "react";
import { get } from "../Services/httpClient";
import { PeliculaCard } from "./PeliculaCard";
import styles from "../Styles/PeliculasGrid.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Error404 from "../Pages/Error404";
import { Loader } from "./Loader";
import { useAuth } from "../Contexts/AuthContext";
import { getFavorito } from "../Pages/AddUser";

export const PeliculasGrid = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [hayMasPag, setHayMasPag] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const { currentUser } = useAuth();
  const { search, setSearch } = useAuth();

  const getFavoritos = () => {
    getFavorito(currentUser.uid).then((res) => {
      setFavoritos([...new Set(res)]);
    });
  };

  const isFavorito = (pelicula) => {
    return favoritos.includes(pelicula.id.toString());
  };

  useEffect(() => {
    const controller = new AbortController();
    getFavoritos();
    setCargando(true);
    const busquedaUrl =
      search != null || ""
        ? "/search/movie?api_key=10ec06e437cd7ab31ae1e11c3d7f6c8b&query=" +
          search +
          "&page=" +
          pagina
        : "/discover/movie?page=" + pagina;
    console.log("la url es: " + busquedaUrl, controller);
    console.log("la busqueda es: " + search);
    get(busquedaUrl, controller)
      .then((datos) => {
        setPeliculas((pagAnterior) => pagAnterior.concat(datos.results));
        setHayMasPag(datos.page < datos.total_pages);
        setCargando(false);
      })
      .catch((e) => {
        console.log(e);
        /* setSearch(""); */ // TODO esto debe actuar despues de renderizar la busqueda
      });

    return () => {
      controller.abort();
    };
  }, [search, pagina]);

  if (!cargando && peliculas.length === 0) {
    return <Error404 />;
  }

  return (
    <InfiniteScroll
      dataLength={peliculas.length}
      hasMore={hayMasPag}
      next={() => setPagina((pagAnterior) => pagAnterior + 1)}
      loader={<Loader />}
    >
      <ul className={styles.peliculasGrid}>
        {peliculas.map((pelicula) => (
          <PeliculaCard key={pelicula.id} pelicula={pelicula} />
        ))}
      </ul>
    </InfiniteScroll>
  );
};
