import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { addFavorito, getUserName } from '../Pages/AddUser';

import Search from './Search'

import styles from '../Styles/Navbar.module.css';


function Navbar() {
  const { signOut, currentUser } = useAuth();
  const navigate = useNavigate();

  
  const handleLogOut = () => {
    signOut();
    navigate("/login");
  }

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <nav className={styles.nav}>
      <div>
        <Link to="/">
          <h1>Pelispedia</h1>
        </Link>
        <ul className={styles.list}>
          <li><button type='button'>
            <Link to="/peliculas">
              <h3>Películas</h3>
            </Link></button>
          </li>
          <li><button type='button'>
            <Link to="/series">
              <h3>Series</h3>
            </Link></button>
          </li>
          {/* Para probar addFavorito*/}
          <li>  <button type='button' onClick={() => getUserName(currentUser.uid)}>
                  <h3>Favoritos</h3>
                </button>
          </li>
          {/* <li>{ LoggedIn &&<button type='button'>
            <Link to="/favs">
              <h3>Favoritos</h3>
            </Link></button>}
          </li> */}
        </ul>
      </div>
      <div className={styles.search}> 
        <ul>
          <li>

            {/* Crear el routing del componente Login a /Login no a / */}
            
            { !currentUser &&
            <button type='button' onClick={handleLogin}>
                <h3>Log in</h3>
            </button>}
            { currentUser &&
            <button type='button' onClick={handleLogOut}>
                <h3>Log out</h3>
            </button>}
          </li>
          <li><Search></Search></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
