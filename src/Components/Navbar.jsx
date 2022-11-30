import React from 'react';

import { Link } from 'react-router-dom';

import styles from '../Styles/Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/series">Series</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
