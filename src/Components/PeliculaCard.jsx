import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerPosterPelicula } from '../Services/obtenerPosterPelicula';
import styles from '../Styles/PeliculasCard.module.css';
import { addFavorito, removeFavorito } from '../Services/userService';
import { useAuth } from '../Contexts/AuthContext';
import { FavoriteStar } from './FavoriteStar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const PeliculaCard = ({ pelicula, favorite, onFavoriteClick }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const imgUrl = obtenerPosterPelicula(pelicula.poster_path, 300);
  const { currentUser } = useAuth();

  const agregarFavorito = async () => {
    await addFavorito(currentUser.uid, pelicula.id); //Agrega el ID pelicula a favoritos del user
    setIsFavorite(true); //setea la prop favorito en true
    // sweetalert
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: <strong>Agregado a fav!</strong>,
      icon: 'success',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    }); // fin sweet alert
  };

  //Obtiene pelicula por su id y asi eliminarla de favoritos
  const quitarFavorito = async () => {
    await removeFavorito(currentUser.uid, pelicula.id);
    setIsFavorite(false);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: <strong>Quitado a fav!</strong>,
      icon: 'success',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    }); // fin sweet alert
  };

  //Comprueba si se ha realizado click para quitar o agregar pelicula a favorito
  const handleStarClick = async () => {
    if (isFavorite) await quitarFavorito();
    else await agregarFavorito();
    if (onFavoriteClick) onFavoriteClick(); //si la prop onFavoriteClick tiene asignada una función en el componente Padre, la ejecuta, sino no
  };

  return (
    <li className={styles.peliculaCard}>
      <Link to={'/peliculas/' + pelicula.id}>
        <img
          width={230}
          height={345}
          className={styles.peliculaImg}
          src={imgUrl}
          alt="Poster de la Pelicula"
        />
      </Link>
      <div className={styles.peliculaTitulo}>
        <span>{pelicula.title}</span>
        <span><FavoriteStar active={isFavorite} onClick={handleStarClick} /></span>
      </div>
    </li>
  );
};
