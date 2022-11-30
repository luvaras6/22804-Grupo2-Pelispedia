import placeholderImagen from "../placeholder-image.jpg";

export function obtenerPosterPelicula(path, width){
    return path ? `https://image.tmdb.org/t/p/w${width}${path}` : placeholderImagen;
}