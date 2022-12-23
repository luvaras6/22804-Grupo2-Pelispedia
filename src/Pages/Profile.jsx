import React, { useState, useEffect } from 'react';
import styles from '../Styles/Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Contexts/AuthContext';
import { getItemById } from '../Services/userService';

const Profile = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const EmailAlert = ({ onClose, onSubmit }) => (
    <div className={styles.alertContainer}>
      <form className={styles.alert} onSubmit={onSubmit}>
        <div className="inputGroup">
          <span>Ingresa tu nuevo email:</span>
          <input className={styles.alertInput} type="email" />
        </div>

        <div className={styles.alertButtonsContainer}>
          <button className={styles.alertButton} onClick={onClose}>
            Cambiar
          </button>
          <button className={styles.alertButton} onClick={onClose}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );

  const PasswordAlert = ({ onClose, onSubmit }) => (
    <div className={styles.alertContainer}>
      <form className={styles.alert} onSubmit={onSubmit}>
        <div className="inputGroup">
          <label htmlFor="password">Ingresa tu nueva contraseña:</label>
          <input className={styles.alertInput} type="password" id="password" />
        </div>

        <div className="inputGroup">
          <label htmlFor="password">Confirma tu nueva contraseña:</label>
          <input className={styles.alertInput} type="password" />
        </div>

        <div className={styles.alertButtonsContainer}>
          <button className={styles.alertButton} onClick={onClose}>
            Cambiar
          </button>
          <button className={styles.alertButton} onClick={onClose}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );

  useEffect(() => {
    getUserData();
  });

  const getUserData = async () => {
    const p = await getItemById(currentUser.uid);
    setUserData(p);
    setLoading(false);
    //   console.log(p.userNombre);
    //   console.log(userData.userNombre);
  };

  const handleOnClose = (e) => {
    e.preventDefault();
    setShowAlert(false);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setShowAlert(false);
  };

  const showChangeEmailAlert = () => {
    setShowAlert('CHANGE_EMAIL');
  };

  const showChangePasswordAlert = () => {
    setShowAlert('CHANGE_PASSWORD');
  };
  // Obtengo los datos del usuario

  return (
    <>
      {!loading && (
        // (console.log(userData),
        <div className={styles.profileContainers}>
          <h2 className={styles.title}>Perfil</h2>
          <FontAwesomeIcon icon={faCircleUser} className={styles.profileIcon} />
          <div className={styles.infoContainer}>
            <div className={styles.infoField}>
              <span>Nombre: </span>
              <span>{userData.userNombre}</span>
            </div>
            <div className={styles.infoField}>
              <span>Apellido: </span>
              <span>{userData.userApellido}</span>
            </div>
            <div className={styles.infoField}>
              <span>Correo: </span>
              <span>{currentUser.email}</span>
            </div>
          </div>
          <button className={styles.button} onClick={showChangeEmailAlert}>
            Cambiar email
          </button>
          <button className={styles.button} onClick={showChangePasswordAlert}>
            Cambiar contraseña
          </button>

          {showAlert === 'CHANGE_EMAIL' ? (
            <EmailAlert onClose={handleOnClose} onSubmit={handleOnSubmit} />
          ) : showAlert === 'CHANGE_PASSWORD' ? (
            <PasswordAlert onClose={handleOnClose} onSubmit={handleOnSubmit} />
          ) : null}
        </div>
      )}
    </>
  );
};

export default Profile;
