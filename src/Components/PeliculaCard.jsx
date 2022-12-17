import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { obtenerPosterPelicula } from '../Services/obtenerPosterPelicula';
import styles from '../Styles/PeliculasCard.module.css';

export const PeliculaCard = ({pelicula}) => {

    const imgUrl = obtenerPosterPelicula(pelicula.poster_path, 300);
    
    return (
        <li className={styles.peliculaCard}>
            <Link to={"/peliculas/" + pelicula.id}>
                <img width={230}
                    height={345}
                    className={styles.peliculaImg}
                    src={imgUrl}
                    alt="Poster de la Pelicula"
                />
            </Link>
            <div className={styles.peliculaTitulo}>
                {pelicula.title}
                <FaStar color="#e0e0e0" size={18} className= {styles.iconStar} onClick={() => console.log("hola")} />
            </div>
        </li>
    )
}