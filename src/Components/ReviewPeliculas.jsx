import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import styles from '../Styles/ReviewPeliculas.module.css';
import { get } from '../Services/httpClient';

export default function TrailerPelicula() {
  const { idPelicula } = useParams();
  const [cargando, setCargando] = useState(true);
  const [review, setReview] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setCargando(true);
    get('/movie/' + idPelicula + '/reviews', controller)
      .then((datos) => {
        setReview(datos);
        setCargando(false);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      controller.abort();
    };
  }, [idPelicula]);

  if (cargando) {
    return <Loader />;
  }

  if (!review) {
    return null;
  }


  return (
    review.results.length > 0 && (
      <div className={styles.container}>
        <div className={styles.row1}>
          <p>
          <img src={`https://www.themoviedb.org/t/p/w45_and_h45_face/${review.results[0].author_details.avatar_path}`} alt='usuario' className={styles.imgAvatar}/>
            {review.results[0].author_details.username}
          </p>
          {review.results[0].author_details.rating != null && (
            <p className={styles.puntuacion}>
              Puntuación:{' '}
              <span className={styles.rating}>
                {review.results[0].author_details.rating}
              </span>
            </p>
          )}
        </div>
        <p>Reseña: </p>
        <div className={styles.review}>
          <p>{review.results[0].content}</p>
        </div>
      </div>
    )
  );
}
