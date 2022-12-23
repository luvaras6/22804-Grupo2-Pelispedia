import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Components/Loader';
import styles from '../Styles/TrailerPelicula.module.css'
import { get } from '../Services/httpClient';

export default function TrailerPelicula() {

    const { idPelicula } = useParams();
    const [cargando, setCargando] = useState(true);
    const [trailer, setTrailer] = useState(null);
  
    useEffect(() => {
      const controller = new AbortController();
      setCargando(true);
      get('/movie/' + idPelicula+ '/videos', controller)
        .then((datos) => {
          setTrailer(datos);
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
    
      if (!trailer) {
        return null;
      }


  return (
    trailer.results.length > 0 &&
    <div className={styles.container}>
        <h2>Mirá el trailer: {trailer.results[0].name}</h2>
        <iframe  src={`https://www.youtube.com/embed/${trailer.results[0].key}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={trailer.results[0].name}></iframe>
    </div>
  )
}
