import { useAuth } from '../Contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import NavBarCanvas from './NavbarCanvas';
import Footer from './Footer';

import styles from '../Styles/App.module.css';

const SignInRoute = ({ redirectPath = '/peliculas' }) => {
  //Obtiene datos del usuario
  const { currentUser } = useAuth();
  //Comprueba que exista ese usuario y de ser asi redirecciona a peliculas
  if (currentUser) return <Navigate to={redirectPath} replace={true} />;

  return (
    <>
      <header>
        <NavBarCanvas />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
};

export default SignInRoute;
