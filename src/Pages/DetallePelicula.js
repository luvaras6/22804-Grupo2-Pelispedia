import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerPosterPelicula } from '../Services/obtenerPosterPelicula';
import styles from "../Styles/DetallePelicula.module.css";
import { get } from '../Services/httpClient';
import { Loader } from '../Components/Loader';
import html2canvas from 'html2canvas';

export function DetallePelicula() {
    const { idPelicula } = useParams();
    const [cargando, setCargando] = useState(true);
    const [pelicula, setPelicula] = useState(null);

    useEffect(() => {
        setCargando(true);
        get("/movie/" + idPelicula).then(datos => {
            setPelicula(datos);
            setCargando(false);
        })
    }, [idPelicula]);

    if (cargando) {
        return <Loader />
    }

    if (!pelicula) {
        return null;
    }


    const descargarInfo = () => {
        html2canvas(document.getElementById("infoDescargar"), { backgroundColor: "#333333", allowTaint: false, useCORS: true }).then(function (canvas) {
            const link = document.createElement("a");
            link.href = canvas.toDataURL();
            link.download = "InfoPelicula/jpg"
            link.click();
        });
    }


    const imgUrl = obtenerPosterPelicula(pelicula.poster_path, 500);
    return (
        <div className={styles.contenedor}>
            <div className={styles.contenedor} id="infoDescargar">
                <img
                    src={imgUrl}
                    alt="Imagen de la pelicula"
                    className={`${styles.columna} ${styles.img}`}
                />
                <div className={`${styles.columna} ${styles.descripcion}`}>
                    <p><strong>Titulo: </strong>{pelicula.title}</p>
                    <p><strong>Género: </strong>{pelicula.genres.map(genero => genero.name).join(", ")}</p>
                    <p><strong>Descripción: </strong>{pelicula.overview}</p>
                </div>
            </div>
            <button onClick={descargarInfo}>Descargar Info</button>
        </div>

    );
}