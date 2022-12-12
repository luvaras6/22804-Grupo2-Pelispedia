import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '../Hooks/useQuery';

import styles from '../Styles/Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search(){
    const query = useQuery();
    const search = query.get("search");
    const navigation =  useNavigate();
    function searchForm(e){
        e.preventDefault();
    }
    return(
        <div > 
            <label htmlFor="searchBar" ><h4>Buscador</h4></label>
        <form className={styles.searchField} onSubmit={searchForm}>
            <input type="text" id='searchBar' className="form-control" placeholder="Buscar" 
            value={search || ""} 
            onChange={(e)=> {
                     const term = e.target.value.toLowerCase();
                     navigation("/?search=" + term);
                    }}/>
            <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
        </div>
    )
}

export default Search;