import styles from './PeliculasCard.module.css';

export const PeliculaCard = (props) => {

    const pelicula = props.pelicula;
    const imgUrl = "https://image.tmdb.org/t/p/w300" + pelicula.poster_path;
    return (
        <li className={styles.peliculaCard}>
            <img
                widh={230}
                height={345}
                className={styles.peliculaImg} src={imgUrl} alt={pelicula.original_title} />
            <div>{pelicula.title}</div>
        </li>
    )
}