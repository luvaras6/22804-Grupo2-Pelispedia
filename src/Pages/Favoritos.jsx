import React from 'react'
// import { useState } from 'react';
// import { useAuth } from '../Contexts/AuthContext';
import { FavoritosGrid } from '../Components/FavoritosGrid';
import { Helmet } from 'react-helmet';


function Favoritos() {

    // const [favoritos, setFavoritos] = useState([]);


    return (
        <>
        <Helmet>
        <title>Pelispedia 🍿 || Favoritos</title>
        <meta name="keywords" content="peliculas estrenos api tmdb" />
        <meta
          name="description"
          content="pagina de peliculas favoritas "
        />
      </Helmet>
            
            <FavoritosGrid></FavoritosGrid>
        </>
    )
}

export default Favoritos;