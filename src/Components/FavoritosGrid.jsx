import React, { useEffect, useState } from 'react';
import { get } from '../Services/httpClient';
import { PeliculaCard } from './PeliculaCard';
import styles from '../Styles/PeliculasGrid.module.css';
import Error404 from '../Pages/Error404';
import { Loader } from './Loader';
import { getFavorito } from '../Pages/AddUser';
import { useAuth } from '../Contexts/AuthContext';

export const FavoritosGrid = ({}) => {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { currentUser } = useAuth();

  const getPeliculaById = (id) => {
    const controller = new AbortController();
    const busquedaUrl = `/movie/${id}`;
    return get(busquedaUrl, controller);
  };

  const getPeliculasFavoritas = () => {
    setCargando(true);
    getFavorito(currentUser.uid).then((resultado) => {
      const idfavs = [...new Set(resultado)];
      const promises = [];
      const favs = [];
      for (let i = 0; i < idfavs.length; i++) {
        const peliId = idfavs[i];
        promises.push(
          getPeliculaById(peliId).then((pelicula) => {
            favs.push(pelicula);
          })
        );
      }

      Promise.all(promises).then(() => {
        setPeliculas(favs);
        setCargando(false);
      });
    });
  };

  useEffect(() => {
    getPeliculasFavoritas(true);
  }, []);

  return (
    <>
      {cargando ? (
        <Loader />
      ) : (
        <ul className={styles.peliculasGrid}>
          {peliculas.map((pelicula) => (
            <PeliculaCard
              key={pelicula.id}
              pelicula={pelicula}
              favorite={true}
            />
          ))}
        </ul>
      )}
    </>
  );
};
