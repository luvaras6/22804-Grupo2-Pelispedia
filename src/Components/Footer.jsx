import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../Styles/Footer.module.css'

export default function Footer() {
  return (
    <div className={styles.container}>
      <div>
        <Link to='/'>PELISPEDIA 🍿</Link>
      </div>
      <copyright className={styles.copyright}>Copyright © 2022 Pelispedia,Inc.</copyright>
      <div>
        <Link to="/about" className={styles.link}>Nosotros</Link>
        <b className={styles.divisor}>|</b>
        <Link to="/peliculas" className={styles.link}>Peliculas</Link>
      </div>
    </div>
  );
}
