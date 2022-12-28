import React, { useContext, useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail as authUpdateEmail,
  updatePassword as authUpdatePassword,
} from 'firebase/auth';
import { db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { Outlet } from 'react-router';

const AuthContext = React.createContext();

// Funciones para manejar el user context, variables de ambiente del usuario y datos en Firebase Authentication

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  auth.onAuthStateChanged((user) => {
    setIsLoading(false);
    setCurrentUser(user);
  });


  // SignUp: Firebase -> 1. crea un doc en Authentication (obteniendo userId) y 2. crea un doc en la colección usuarios con el mismo userId
  const signUp = async ({ email, password, userName }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, 'usuarios', user.uid), {
      userId: user.uid,
      userEmail: email,
      userNombre: userName,
      userApellido: '',
    });
  };

  const signIn = async ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    return auth.signOut().catch((e) => e);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateEmail = async (email) => {
    return authUpdateEmail(currentUser, email);
  };

  const updatePassword = async (password) => {
    return authUpdatePassword(currentUser, password);
  };

  const value = {
    currentUser,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && <Outlet />}
    </AuthContext.Provider>
  );
}
