import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerPosterPelicula } from '../Services/obtenerPosterPelicula';
import styles from '../Styles/PeliculasCard.module.css';
import { addFavorito } from '../Services/userService';
import { useAuth } from '../Contexts/AuthContext';
import { FavoriteStar } from './FavoriteStar';
import { useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const PeliculaCard = ({ pelicula, favorite }) => {
    const [isFavorite, setIsFavorite] = useState(favorite);
    const imgUrl = obtenerPosterPelicula(pelicula.poster_path, 300);
    const { currentUser } = useAuth();

    const agregarFavorito = async () => {
        const resultado = await addFavorito(currentUser.uid, pelicula.id);
        setIsFavorite(true);

        // sweetalert
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: <strong>Agregado a fav!</strong>,
            icon: 'success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1800,
            timerProgressBar: true,
        });// fin sweet alert
    };

    useEffect(() => {
        setIsFavorite(favorite);
    }, [favorite]);

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
                {pelicula.title}
                <FavoriteStar active={isFavorite} onClick={agregarFavorito} />
            </div>
        </li>
    );
};
