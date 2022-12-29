import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Components/Loader';
import styles from '../Styles/TrailerPelicula.module.css';
import { get } from '../Services/httpClient';
import { useQuery } from '@tanstack/react-query';

export default function TrailerPelicula() {
  const { idPelicula } = useParams();
  // const [trailer, setTrailer] = useState(null);

  const fetchMovieTrailer = async () => {
    const enTrailer = await get('/movie/' + idPelicula + '/videos');
    const esTrailer = await get(`/movie/${idPelicula}/videos?language=es-MX`);
    if (esTrailer.results.length > 0) return esTrailer;
    else return enTrailer;
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['trailer'],
    queryFn: fetchMovieTrailer,
  });

  useEffect(() => {
    refetch();
  }, [idPelicula, refetch]);

  if (isLoading) return <Loader />;

  if (!data) return null;

  return (
    data.results.length > 0 && (
      <div className={styles.container}>
        <h2>Mirá el trailer: {data.results[0].name}</h2>
        <iframe
          src={`https://www.youtube.com/embed/${data.results[0].key}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={data.results[0].name}
        ></iframe>
      </div>
    )
  );
}
