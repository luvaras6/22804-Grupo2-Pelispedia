import React from 'react';
import { get } from '../Services/httpClient';
import { PeliculaCard } from './PeliculaCard';
import styles from '../Styles/PeliculasGrid.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Error404 from '../Pages/Error404';
import { Loader } from './Loader';
import { getFavorito } from '../Services/userService';
import { useAuth } from '../Contexts/AuthContext';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const PeliculasGrid = () => {
  const { currentUser } = useAuth();

  // TODO implementar buscador
  // const { search, setSearch } = useAuth();

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

  // Cargar lista de peliculas desde TheMovieDB
  const fetchMovies = async ({ pageParam = 1 }) => {
    const busquedaUrl = '/discover/movie?page=' + pageParam;
    return await get(busquedaUrl).then((response) => response);
  };
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length === lastPage.total_pages) return null;
      return pages.length + 1;
    },
  });

  if (status === 'error' || favoritesQuery.useState === 'error')
    return <Error404 />;

  if (status === 'loading' || favoritesQuery.status === 'loading')
    return <Loader />;

  return (
    <InfiniteScroll
      dataLength={data.pages.length}
      hasMore={hasNextPage}
      next={fetchNextPage}
      loader={<Loader />}
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
