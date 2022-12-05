import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../Styles/Login.module.css";

//import { auth } from '../firebase';
import Firebase, { db } from '../firebase';
import {collection, getDocs, getDoc, query, doc, addDoc} from 'firebase/firestore';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    history("/peliculas")
  };

  const signInUser = (e) => {
    e.preventDefault();
  //  db.signInWithEmailAndPassword(email, password).then((db) => history('/')).catch(err=>alert('Error al ingresar'));
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  return (
    <form className={`${styles.form} w-xs-90 w-lg-50`} onSubmit={handleSubmit}>
      <div className={styles.login}>
        <h2>Inicia Sesión</h2>
      </div>
      <div className={styles.input}>
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input 
        type="email" 
        className="form-control" 
        required
        id="exampleInputEmail1" 
        onChange={e=>setEmail(e.target.value)} 
        value={email} />
      </div>
      <div className={styles.inputPassword}>
        <label htmlFor="exampleInputPassword1" className="form-label">
          Contraseña
        </label>
        <input
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className={styles.btnLink}>
        <Link className={styles.signup} to="/SignUp">{"Aún no posee una cuenta? Crear"}</Link>
        <button type="submit" className={styles.btn} >
          Ingresar
        </button>
      </div>
    </form>
  );
};

export default Login;
