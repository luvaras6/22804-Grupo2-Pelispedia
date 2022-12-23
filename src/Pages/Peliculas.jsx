import React from 'react';
import { PeliculasGrid } from '../Components/PeliculasGrid';
// import peliculas from '../peliculas.json';
import ScrollToTop from 'react-scroll-to-top';
import { Helmet } from 'react-helmet-async';

function Peliculas() {
  return (
    <>
      <Helmet>
        <title>Pelispedia 🍿</title>
        <meta name="keywords" content="peliculas estrenos api tmdb" />
        <meta name="description" content="catalogo de peliculas " />
      </Helmet>
      <PeliculasGrid />
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
