import styles from './Styles/App.module.css';

import Navbar from './Components/Navbar';

import { Route, Routes, Link } from 'react-router-dom';

import Series from './Pages/Series';
import Peliculas from './Pages/Peliculas';


function App() {
  return (
    <div className={styles.App}>
      <header>
        <Link to="/">
          <h1>Pelispedia</h1>
        </Link>
      </header>
      <Navbar />
      <main className={styles.main}>
        {/* Ruteo de paginas */}
        <Routes>
          <Route path="/" element={<Peliculas />} />
          <Route path="/series" element={<Series />} />
        </Routes>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
