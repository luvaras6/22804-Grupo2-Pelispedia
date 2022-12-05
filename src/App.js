import styles from "./Styles/App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Navbar";

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Series from "./Pages/Series";
import Peliculas from "./Pages/Peliculas";

import { Route, Routes } from "react-router-dom";
import About from './Pages/About';
import Error404 from './Pages/Error404';
import Footer from './Components/Footer';


function App() {
  return (
    <div className={styles.App}>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        {/* Ruteo de paginas */}
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/peliculas" element={<Peliculas />} />
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
