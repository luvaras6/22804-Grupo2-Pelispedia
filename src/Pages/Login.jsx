import React, { useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import styles from '../Styles/Login.module.css';

import { useAuth } from '../Contexts/AuthContext';

const errorDescription = {
  'auth/wrong-password': 'Credenciales invalidas',
};

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuth();

  const mutation = useMutation(signIn, {
    onSuccess: () => {
      <Navigate to={'/peliculas'} />;
    },
  });

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
      {mutation.isError && <p>{mutation.error}</p>}
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
