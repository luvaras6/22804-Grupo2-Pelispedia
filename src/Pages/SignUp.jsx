import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import styles from "../Styles/SignUp.module.css";

function SignUp() {
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const { signUp, currentUser } = useAuth();

  // TODO: Redirigir al login
  const navigate = useNavigate();

  // TODO: Agregar validaciones
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      setError("");
      await signUp(emailRef.current.value, passwordRef.current.value);      
      setLoading(false);
    } catch (error) {
      setError("Error, no se pudo registrar el nuevo usuario");
    }
  };

  useEffect(() => {
    if (currentUser) return navigate("/peliculas", { replace: true });
  }, []);

  return (
    <form className={`${styles.form} w-xs-90 w-lg-50`} onSubmit={handleSubmit}>
      <div className={styles.signup}>
        <h2>Registrate</h2>
      </div>
      <div className={styles.input}>
        {error && <h3>{error}</h3>}
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          type="email"
          required
          className="form-control"
          id="exampleInputEmail1"
          ref={emailRef}
        />
      </div>
      <div className={styles.inputPassword}>
        <label htmlFor="exampleInputPassword1" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          required
          minLength="4"
          className="form-control"
          id="exampleInputPassword1"
          ref={passwordRef}
        />
      </div>
      <div className={styles.btnLink}>
        <Link className={styles.signup} to="/">
          {"Ya posee una cuenta? Ingresar"}
        </Link>
        <button type="submit" className={styles.btn} disabled={loading}>
          Crear
        </button>
      </div>
    </form>
  );
}

export default SignUp;
