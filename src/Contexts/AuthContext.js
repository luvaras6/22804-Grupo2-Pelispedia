import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail as authUpdateEmail,
  updatePassword as authUpdatePassword,
} from "firebase/auth";
import Firebase,{ db } from '../firebase';
import {collection, addDoc,setDoc,doc} from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const signUp = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await setDoc(doc(db, "usuarios",user.uid), {
        "userId": user.uid,
        "userEmail" : email,
        "userNombre":"",
        "userApellido":"",
      });
    }
      catch (err) {
        console.error(err);
        alert(err.message);
      }
    }

  const signIn = async (email, password) => {
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
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });
    
    return unsubscribe;
  }, []);

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
      {!loading && children}
    </AuthContext.Provider>
  );
}
