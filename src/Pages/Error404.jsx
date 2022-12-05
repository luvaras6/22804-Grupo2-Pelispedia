import React from 'react';

import { Link } from 'react-router-dom';

import styles from '../Styles/Error404.module.css';

export default function Error404() {
  return (
    <div className={styles.container}>
      <figure>
        <img src="./404.png" alt="error_404"/>
      </figure>
      <div className={styles.text}>
        <h2>awww... No te preocupes.</h2>
        <p className={styles.error}>es solo un error 404!</p>
        <p>lo que busca puede haberse extraviado en la memoria a largo plazo</p>
        <Link to="/" className={styles.volver}>↩ Volver</Link>
      </div>
    </div>
  );
}
