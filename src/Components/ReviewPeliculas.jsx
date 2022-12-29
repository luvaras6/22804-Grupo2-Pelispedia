import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import styles from '../Styles/ReviewPeliculas.module.css';
import { get } from '../Services/httpClient';
import { useQuery } from '@tanstack/react-query';

export default function TrailerPelicula() {
  const { idPelicula } = useParams();

  //Renderiza cada vez que se actualiza el id de pelicula para mostrar su información(poster, puntuación y reseña)
  const fetchMovieReview = async () => {
    const enReview = await get('/movie/' + idPelicula + '/reviews');
    const esReview = await get(`/movie/${idPelicula}/reviews?language=es-MX`);
    if (esReview.results.length > 0) return esReview;
    else return enReview;
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['review'],
    queryFn: fetchMovieReview,
  });

  useEffect(() => {
    refetch();
  }, [idPelicula, refetch]);

  if (isLoading) return <Loader />;

  if (!data) {
    return null;
  }

  return (
    data.results.length > 0 && (
      <div className={styles.container}>
        <div className={styles.row1}>
          <p>
            <img
              src={`https://www.themoviedb.org/t/p/w45_and_h45_face/${data.results[0].author_details.avatar_path}`}
              alt="usuario"
              className={styles.imgAvatar}
            />
            {data.results[0].author_details.username}
          </p>
          {data.results[0].author_details.rating != null && (
            <p className={styles.puntuacion}>
              Puntuación:{' '}
              <span className={styles.rating}>
                {data.results[0].author_details.rating}
              </span>
            </p>
          )}
        </div>
        <p>Reseña: </p>
        <div className={styles.review}>
          <p>{data.results[0].content}</p>
        </div>
      </div>
    )
  );
}
