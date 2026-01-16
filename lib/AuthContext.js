"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) {
        const result = await getRedirectResult(auth);
        if (result?.user) {
            setUser(result.user);
            return;
        }
        }
        setUser(firebaseUser);
    });

    return () => unsubscribe();
    }, []);


  return (
    <AuthContext.Provider value={isLoaded ? user : null}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}