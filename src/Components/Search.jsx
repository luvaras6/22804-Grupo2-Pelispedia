import React from 'react';
import { useState } from 'react';
import styles from '../Styles/Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  //Buscador de pelicula por texto ingresado en input de form. 
  const busquedaPeli = (e) => {
    e.preventDefault();
    navigate(`/peliculas/search/${busqueda}`, { replace: true });
  };

  //Obtiene value ingresado en input y lo settea en el estado de busqueda
  const changeHandler = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <div>
      <form className={styles.searchField} onSubmit={busquedaPeli}>
        <input
          type="search"
          id="searchBar"
          className="form-control"
          placeholder="Buscar películas"
          name="busqueda"
          value={busqueda}
          onChange={changeHandler}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
}

export default Search;
