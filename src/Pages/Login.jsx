import React, { useReducer, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Styles/Login.module.css";

import { useAuth } from "../Contexts/AuthContext";

const errorDescription = {
  "auth/wrong-password": "Credenciales invalidas",
};

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          error: null,
          isLoading: true,
        };
      case "LOGIN_SUCCESS":
        return {
          error: null,
          isLoading: false,
        };
      case "LOGIN_FAILED":
        return {
          error:
            errorDescription[action.payload.code] ||
            "Error al ingresar en la cuenta",
          isLoading: false,
        };
      default:
        console.log("action.type no registrado");
    }
  }, {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      await signIn(emailRef.current.value, passwordRef.current.value);
      dispatch({ type: "LOGIN_SUCCESS" });
      navigate("/peliculas");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILED", payload: error });
    }
  };

  return (
    <form className={`${styles.form} w-xs-90 w-lg-50`} onSubmit={handleSubmit}>
      <div className={styles.login}>
        <h2>Inicia Sesión</h2>
      </div>
      {state.error && <p>{state.error}</p>}
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
          {"Aún no posee una cuenta? Crear"}
        </Link>
        <Link className={styles.signup} to="/loginhelp">
          {"¿Olvidaste tu contraseña?"}
        </Link>
        <button type="submit" className={styles.btn} disabled={state.isLoading}>
          Ingresar
        </button>
      </div>
    </form>
  );
};

export default Login;
