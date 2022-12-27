import React from 'react';
import { PeliculasGrid } from '../Components/PeliculasGrid';
import ScrollToTop from 'react-scroll-to-top';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

function Peliculas() {
  const { search } = useParams();

  return (
    <>
      <Helmet>
        <title>Pelispedia 🍿</title>
        <meta name="keywords" content="peliculas estrenos api tmdb" />
        <meta name="description" content="catalogo de peliculas " />
      </Helmet>
      <PeliculasGrid search={search} />
      <ScrollToTop
        title="subir"
        smooth
        style={{
          backgroundColor: 'white',
          padding: '.5rem',
          border: 'none',
          bottom: '10rem',
        }}
      />
    </>
  );
}

export default Peliculas;
