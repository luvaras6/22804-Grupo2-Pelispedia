// Input buscador de peliculas
import { useLocation } from 'react-router-dom';

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}
