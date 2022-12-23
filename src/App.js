import styles from './Styles/App.module.css';

import SignInRoute from './Components/SignInRoute';
import ProtectedRoute from './Components/ProtectedRoute';

import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import LoginHelp from './Pages/LoginHelp';
import Favoritos from './Pages/Favoritos';
import Peliculas from './Pages/Peliculas';
import { DetallePelicula } from './Pages/DetallePelicula';
import About from './Pages/About';
import Profile from './Pages/Profile';
import Error404 from './Pages/Error404';
import { AuthProvider } from './Contexts/AuthContext';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Desactivar registro de errores en React Query
const queryClient = new QueryClient({
  logger: {
    log: () => null,
    warn: () => null,
    error: () => null,
  },
});

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        element: <SignInRoute />,
        children: [
          { path: '/', element: <Login /> },
          { path: '/login', element: <Login /> },
          { path: '/signup', element: <SignUp /> },
          { path: '/loginHelp', element: <LoginHelp /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/peliculas', element: <Peliculas /> },
          { path: '/peliculas/:idPelicula', element: <DetallePelicula /> },
          { path: '/favoritos', element: <Favoritos /> },
          { path: '/about', element: <About /> },
          { path: '/profile', element: <Profile /> },
        ],
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.App}>
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
