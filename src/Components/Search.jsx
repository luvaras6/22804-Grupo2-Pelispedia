import React from "react";

import { useState } from "react";

import styles from "../Styles/Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Contexts/AuthContext";

function Search() {
  const [busqueda, setBusqueda] = useState("");
  const { setSearch } = useAuth();

  const busquedaPeli = (e) => {
    e.preventDefault();
    setSearch(busqueda);
    console.log("busqueda peli: " + busqueda);
    /* setBusqueda(null); */
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
