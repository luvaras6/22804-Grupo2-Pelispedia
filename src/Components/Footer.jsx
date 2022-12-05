import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../Styles/Footer.module.css'

export default function Footer() {
  return (
    <div className={styles.container}>
      <div>
        <Link to='/'>PELISPEDIA 🍿</Link>
      </div>
      <div className={styles.copyright}>Copyright © 2022 Pelispedia,Inc.</div>
      <div>
        <Link to="/about" className={styles.link}>About us</Link>
        <b className={styles.divisor}>|</b>
        <Link to="/" className={styles.link}>Peliculas</Link>
        <b className={styles.divisor}>|</b>
        <Link to="/series" className={styles.link}>Series</Link>
      </div>
    </div>
  );
}
