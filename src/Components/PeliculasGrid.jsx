import React, { useEffect, useState } from 'react';
import { get } from '../Services/httpClient';
import { PeliculaCard } from './PeliculaCard';
import styles from '../Styles/PeliculasGrid.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Error404 from '../Pages/Error404';
import { Loader } from './Loader';
import { getFavorito } from '../Services/userService';
import { useAuth } from '../Contexts/AuthContext';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const PeliculasGrid = ({ search }) => {
  const { currentUser } = useAuth();

  // TODO implementar buscador

  const isFavorito = (pelicula) => {
    return favoritesQuery.data.includes(pelicula.id.toString());
  };

  // Cargar lista de favoritos desde FireBase
  const fetchFavorites = async () => {
    return await getFavorito(currentUser.uid).then((res) => [...new Set(res)]);
  };
  const favoritesQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
  });

  // Cargar lista de peliculas desde TheMovieDB y renderizar búsqueda 
  const fetchMovies = async ({ pageParam = 1 }) => {
    const busquedaUrl = search
      ? '/search/movie?api_key=10ec06e437cd7ab31ae1e11c3d7f6c8b&query=' +
        search +
        '&page=' +
        pageParam
      : '/discover/movie?page=' + pageParam;
    return await get(busquedaUrl).then((response) => response);
  };
  const { data, fetchNextPage, hasNextPage, status, refetch } =
    useInfiniteQuery({
      queryKey: ['movies'],
      queryFn: fetchMovies,
      getNextPageParam: (lastPage, pages) => {
        if (pages.length === lastPage.total_pages) return null;
        return pages.length + 1;
      },
    });

  // Volver a cargar peliculas
  useEffect(() => {
    refetch();
  }, [search, refetch]);

  //Comprueba si existe error para redireccionar al user a página Not Found
  if (status === 'error' || favoritesQuery.useState === 'error')
    return <Error404 />;

  //Muestra Loader en caso de que el status de la petición sea loading
  if (status === 'loading' || favoritesQuery.status === 'loading')
    return <Loader />;

  return (
    <InfiniteScroll
      dataLength={data.pages.length}
      hasMore={hasNextPage}
      next={fetchNextPage}
      loader={<Loader />}
      // scrollThreshold="1"
    >
      <ul className={styles.peliculasGrid}>
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.results.map((movie) => (
              <PeliculaCard
                key={movie.id}
                favorite={() => isFavorito(movie)}
                pelicula={movie}
              />
            ))}
          </React.Fragment>
        ))}
      </ul>
    </InfiniteScroll>
  );
};
