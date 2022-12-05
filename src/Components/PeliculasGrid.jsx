import { PeliculaCard } from "./PeliculaCard";
import styles from "./PeliculasGrid.module.css"


export const PeliculasGrid = (props) => {
    const peliculas = props.peliculas;

    return (
        <>
            <ul className={styles.peliculasGrid}>
                {peliculas.map(p => (<PeliculaCard pelicula={p} key={p.id} />))}
            </ul>
        </>
    )
}