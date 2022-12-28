import React, { useEffect, useState } from 'react';
import { get } from '../Services/httpClient';
import { PeliculaCard } from './PeliculaCard';
import styles from '../Styles/PeliculasGrid.module.css';
import Error404 from '../Pages/Error404';
import { Loader } from './Loader';
import { getFavorito } from '../Services/userService';
import { useAuth } from '../Contexts/AuthContext';

export const FavoritosGrid = ({ }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { currentUser } = useAuth();

  //recibe por parámetro un ID de pelicula y obtiene los datos correspondientes a esa pelicula
  const getPeliculaById = (id) => {
    const controller = new AbortController();
    const busquedaUrl = `/movie/${id}`;
    return get(busquedaUrl, controller); //realiza un fetch a la api de peliculas para traer los datos de la peli
  };

  const getPeliculasFavoritas = () => {
    setCargando(true);
    getFavorito(currentUser.uid).then((resultado) => { //obtiene los favoritos correspondientes al usuario logueado
      const idfavs = [...new Set(resultado)]; //evita guardar en el set duplicados
      const promises = [];
      const favs = [];
      //recorre la lista de idfavs, llama a la funcion que obtiene toda la info correspondiente a ese ID, y lo guarda en favs
      for (let i = 0; i < idfavs.length; i++) {
        const peliId = idfavs[i];
        promises.push(
          getPeliculaById(peliId).then((pelicula) => {
            favs.push(pelicula);
          })
        );
      }

      //para poder controlar que el loading se apague cuando se hayan cumplido todas las promesas (todas las peliculas favoritas)
      Promise.all(promises).then( //objeto que permite controlar que los sets se ejecuten una vez que terminen todos los detalles de peliculas (promesas)
        () => {
          setPeliculas(favs);
          setCargando(false);
        }
      );
    });
  }


  useEffect(() => {
    getPeliculasFavoritas();
  }, [])

  if (!peliculas.length) {
    return (
      <div  className={styles.noFav}>
        <h3>No hay películas en favoritos</h3>
      </div>
    )
  }

  return (
    <>
      {cargando ?
        <Loader />
        :
        <ul className={styles.peliculasGrid}>
          {peliculas.map(pelicula =>
            <PeliculaCard key={pelicula.id} pelicula={pelicula} favorite={true} onFavoriteClick={getPeliculasFavoritas} />
          )}
        </ul>
      }
    </>
  );
}
