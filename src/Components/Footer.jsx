import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../Styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div>
        <Link to='/'>PELISPEDIA 🍿</Link>
      </div>
      <p className={styles.copyright}>Copyright © 2022 Pelispedia,Inc.</p>
      <div>
        <Link to="/about" className={styles.link}>Nosotros</Link>
        <b className={styles.divisor}>|</b>
        <Link to="/peliculas" className={styles.link}>Películas</Link>
      </div>
    </footer>
  );
}
