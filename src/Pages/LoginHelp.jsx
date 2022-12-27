import styles from "../Styles/LoginHelp.module.css";
import React, { useRef, useReducer } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const LoginHelp = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();

  //De acuerdo a la acción que se este realizando en la petición de resetear password se modificará o no(si hay error) el estado del resetPassword
  const reducer = (state, action) => {
    switch (action.type) {
      case "RESET_PASSWORD_START":
        return {
          errors: null,
          isLoading: true,
        };
      case "RESET_PASSWORD_SUCCESS":
        return {
          errors: null,
          isLoading: false,
        };
      case "RESET_PASSWORD_FAILED":
        return {
          errors:
            action.error === "auth/user-not-found"
              ? "Email no registrado"
              : "Error al recuperar contraseña",
          isLoading: false,
        };
      default:
        console.log("action.type no registrado");
    }
  };

  const [state, dispatch] = useReducer(reducer, {});

  //Funcion que permite generar las acciones para resetear el estado del password(start, success or error)
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: "RESET_PASSWORD_START",
    });
    try {
      await resetPassword(emailRef.current.value);
      dispatch({
        type: "RESET_PASSWORD_SUCCESS",
      });
    } catch (error) {
      dispatch({
        type: "RESET_PASSWORD_FAILED",
        error: error.code,
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Inicia Sesión</h2>
      {state.errors && <p>{state.errors}</p>}
      <div className={styles.inputGroup}>
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          type="email"
          ref={emailRef}
          className="form-control"
          required
          id="exampleInputEmail1"
        />
      </div>
      <button type="submit" className={styles.btn} disabled={state.isLoading}>
        Buscar
      </button>
      <Link className={styles.loginLink} to="/login">
        {"Volver atras"}
      </Link>
    </form>
  );
};

export default LoginHelp;
