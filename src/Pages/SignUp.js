import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Styles/SignUp.module.css";
import {addUser} from './AddUser';

function SignUp() {

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      addUser(email,password);
      if(email && password){
        history("/login")
    }
    } catch (error) {
      alert("No se pudo crear el usuario")
      // sweet alert
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  return (
    <form className={`${styles.form} w-xs-90 w-lg-50`} onSubmit={handleSubmit}>
      <div className={styles.signup}>
        <h2>Registrate</h2>
      </div>
      <div className={styles.input}>
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input 
        type="email" 
        required
        className="form-control" 
        id="exampleInputEmail1"  
        value={email} 
        onChange={e=>setEmail(e.target.value)} />
      </div>
      <div className={styles.inputPassword}>
        <label htmlFor="exampleInputPassword1" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          required
          minlength="4"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
      </div>
      <div className={styles.btnLink}>
        <Link className={styles.signup} to="/">
          {"Ya posee una cuenta? Ingresar"}
        </Link>
        <button type="submit" className={styles.btn} >
          Crear
        </button>
      </div>
    </form>
  );
}

export default SignUp;
