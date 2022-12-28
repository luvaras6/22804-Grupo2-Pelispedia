import React from 'react';
import { useState } from 'react';
import styles from '../Styles/Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function Search() {
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const busquedaPeli = (e) => {
    e.preventDefault();
    navigate(`/peliculas/search/${busqueda}`, { replace: true });
  };

  const changeHandler = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <div>
      <form className={styles.searchField} onSubmit={busquedaPeli}>
        <input
          type="search"
          id="searchBar"
          className={styles.formControl}
          placeholder="Buscar películas"
          name="busqueda"
          value={busqueda}
          onChange={changeHandler}
        />
        <button type="submit" className={`${styles.icono}`}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
}

export default Search;
