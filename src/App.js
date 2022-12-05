import styles from './Styles/App.module.css';

import Navbar from './Components/Navbar';

import { Route, Routes, Link } from 'react-router-dom';

import Series from './Pages/Series';
import Peliculas from './Pages/Peliculas';
import About from './Pages/About';
import Error404 from './Pages/Error404';
import Footer from './Components/Footer';


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
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Peliculas />} />
          <Route path="/series" element={<Series />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
