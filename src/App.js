import styles from "./Styles/App.module.css";

import NavBarCanvas from "./Components/NavbarCanvas";
import ProtectedRoute from "./Components/ProtectedRoute";

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import LoginHelp from "./Pages/LoginHelp";
import Favoritos from "./Pages/Favoritos";
import Peliculas from "./Pages/Peliculas";
import { DetallePelicula } from "./Pages/DetallePelicula";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Error404 from "./Pages/Error404";
import { AuthProvider } from "./Contexts/AuthContext";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";

function App() {
  return (
    <AuthProvider>
      <div className={styles.App}>
          <header>
          <NavBarCanvas />
          </header>
        <main className={styles.main}>
          {/* Ruteo de paginas */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/loginHelp" element={<LoginHelp />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/peliculas" element={<Peliculas />} />
              <Route
                exact
                path="/peliculas/:idPelicula"
                element={<DetallePelicula />}
              ></Route>
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
