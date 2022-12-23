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

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [search, setSearch] = useState();

  auth.onAuthStateChanged((user) => {
    setIsLoading(false);
    setCurrentUser(user);
  });

  const signUp = async (email, password, userName) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await setDoc(doc(db, 'usuarios', user.uid), {
        userId: user.uid,
        userEmail: email,
        userNombre: userName,
        userApellido: '',
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
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
    search,
    setSearch,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && <Outlet />}
    </AuthContext.Provider>
  );
}
