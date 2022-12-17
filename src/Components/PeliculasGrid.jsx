import React, { useEffect, useState } from 'react';
import { get } from '../Services/httpClient';
import { PeliculaCard } from "./PeliculaCard";
import styles from "../Styles/PeliculasGrid.module.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import Error404 from '../Pages/Error404';
import { Loader } from './Loader';

export const PeliculasGrid = ({busqueda}) => {
    const [ peliculas, setPeliculas ] = useState([]);
    const [ cargando, setCargando ] = useState(true);
    const [ pagina, setPagina ] = useState(1);
    const [ hayMasPag, setHayMasPag ] = useState(true);

    useEffect(()=>{
        const controller = new AbortController();
        setCargando(true);
        const busquedaUrl = busqueda ? "/search/movie?query=" + busqueda + "&page=" + pagina : "/discover/movie?page=" + pagina;
        get(busquedaUrl, controller)
        .then(datos => {
            setPeliculas(pagAnterior => pagAnterior.concat(datos.results));
            setHayMasPag(datos.page < datos.total_pages);
            setCargando(false);
        }).catch((e)=>{
            console.log(e)
        })

        return () => {
            controller.abort();
        }
    }, [busqueda, pagina])

    if(!cargando && peliculas.length === 0){
        return <Error404 />
    }

    return (
        <InfiniteScroll
            dataLength={peliculas.length}
            hasMore={hayMasPag}
            next={()=> setPagina(pagAnterior => pagAnterior + 1)}
            loader={<Loader />}
        >
            <ul className={styles.peliculasGrid}>
                {peliculas.map(pelicula => 
                    <PeliculaCard key={pelicula.id} pelicula={pelicula} />
                )}
            </ul>
        </InfiniteScroll>
    );
}