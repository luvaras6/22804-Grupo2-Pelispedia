import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import styles from '../Styles/RedesSocialesPeliculas.module.css'
import { get } from '../Services/httpClient';
import { FaFacebookSquare, FaInstagramSquare,FaTwitterSquare } from 'react-icons/fa';

export default function TrailerPelicula() {

    const { idPelicula } = useParams();
    const [cargando, setCargando] = useState(true);
    const [redes, setRedes] = useState(null);
  
    useEffect(() => {
      const controller = new AbortController();
      setCargando(true);
      get('/movie/' + idPelicula+ '/external_ids', controller)
        .then((datos) => {
          setRedes(datos);
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
    
      if (!redes) {
        return null;
      }


  return (
    <div className={styles.container}>
      {redes.social &&
      <p>Visita sus redes:</p>}
      {
        redes.instagram_id != null &&
      <a href={`https://www.instagram.com/${redes.instagram_id}`} rel='noreferrer' target='_blank' title='ver instagram'>
        <FaInstagramSquare size={30}  style={{color:'#A8A4CE'}}/>
      </a>
      }
      {
        redes.facebook_id != null &&
      <a href={`https://www.facebook.com/${redes.facebook_id}`} rel='noreferrer' target='_blank' title='ver facebook'>
        <FaFacebookSquare size={30}  style={{color:'#A8A4CE'}}/>
      </a>
      }
      {
        redes.twitter_id != null &&
      <a href={`https://twitter.com/${redes.twitter_id}`} rel='noreferrer' target='_blank' title='ver twitter'>
        <FaTwitterSquare size={30}  style={{color:'#A8A4CE'}}/>
      </a>
      }
    </div>
  )
}
