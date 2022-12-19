import React, { useState } from "react";
import { Link } from "react-router-dom";
import { obtenerPosterPelicula } from "../Services/obtenerPosterPelicula";
import styles from "../Styles/PeliculasCard.module.css";
import { addFavorito } from "../Pages/AddUser";
import { useAuth } from "../Contexts/AuthContext";
import { FavoriteStar } from "./FavoriteStar";
import { useEffect } from "react";

export const PeliculaCard = ({ pelicula, favorite }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const imgUrl = obtenerPosterPelicula(pelicula.poster_path, 300);
  const { currentUser } = useAuth();

  const agregarFavorito = async () => {
    const resultado = await addFavorito(currentUser.uid, pelicula.id);
    setIsFavorite(true);
  };

  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);

  return (
    <li className={styles.peliculaCard}>
      <Link to={"/peliculas/" + pelicula.id}>
        <img
          width={230}
          height={345}
          className={styles.peliculaImg}
          src={imgUrl}
          alt="Poster de la Pelicula"
        />
      </Link>
      <div className={styles.peliculaTitulo}>
        {pelicula.title}
        <FavoriteStar active={isFavorite} onClick={agregarFavorito} />
      </div>
    </li>
  );
};
