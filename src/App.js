import styles from "./Styles/App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Navbar";

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Series from "./Pages/Series";
import Peliculas from "./Pages/Peliculas";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className={styles.App}>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>
        {/* Ruteo de paginas */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/peliculas" element={<Peliculas />} />
          <Route path="/series" element={<Series />} />
        </Routes>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
