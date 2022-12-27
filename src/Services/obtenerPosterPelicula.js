import placeholderImagen from "../placeholder-image.jpg";

// obtiene flyer de la película dada una dirección
export function obtenerPosterPelicula(path, width){
    return path ? `https://image.tmdb.org/t/p/w${width}${path}` : placeholderImagen;
}
// obtiene el fondo de pantalla de la película dada una dirección
export function obtenerBackdropPelicula(path,width){
    return path ? `https://image.tmdb.org/t/p/w${width}${path}` : placeholderImagen;
}