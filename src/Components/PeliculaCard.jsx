import React from 'react';
import { Link } from "react-router-dom";
import { obtenerPosterPelicula } from '../Services/obtenerPosterPelicula';
import styles from './PeliculasCard.module.css';

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
                <div className={styles.peliculaTitulo}>
                    {pelicula.title}
                </div>
            </Link>
        </li>
    )
}