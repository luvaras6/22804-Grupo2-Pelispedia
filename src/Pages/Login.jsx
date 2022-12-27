import React, { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import styles from '../Styles/Login.module.css';

import { useAuth } from '../Contexts/AuthContext';
import authErrors from '../data/authErrors';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuth();
  const [error, setError] = useState();

  //Hook que nos ayuda a manejar los estados de la petición(success, error or pending)
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      <Navigate to={'/peliculas'} />;
    },
    onError: (error) => {
      return setError(authErrors[error.code] || error.code);
    },
  });

  //Captura los datos ingresados en el form y los settea a las const de email y password
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <form className={`${styles.form} w-xs-90 w-lg-50`} onSubmit={handleSubmit}>
      <div className={styles.login}>
        <h2>Inicia Sesión</h2>
      </div>
      {error && <p>{error}</p>}
      <div className={styles.input}>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          required
          id="email"
          ref={emailRef}
        />
      </div>
      <div className={styles.inputPassword}>
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          required
          type="password"
          className="form-control"
          id="password"
          ref={passwordRef}
        />
      </div>
      <div className={styles.btnLink}>
        <Link className={styles.signup} to="/SignUp">
          {'Aún no posee una cuenta? Crear'}
        </Link>
        <Link className={styles.signup} to="/loginhelp">
          {'¿Olvidaste tu contraseña?'}
        </Link>
        <button
          type="submit"
          className={styles.btn}
          disabled={mutation.isLoading}
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};

export default Login;
