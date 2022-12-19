import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [search, setSearch] = useState();

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    return auth.signOut();
  };

  const updateEmail = (email) => {
    return auth.currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return auth.currentUser.updatePassword(password);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });
  }, []);

  const value = {
    currentUser,
    signIn,
    signUp,
    signOut,
    updateEmail,
    updatePassword,
    search,
    setSearch,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
