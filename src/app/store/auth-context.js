"use client";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
    } catch (error) {
      console.error("Error reading token from localStorage:", error);
    }
  }, []);

  function authenticate(token) {
    try {
      setAuthToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error saving token to localStorage:", error);
    }
  }

  function logout() {
    try {
      setAuthToken("");
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error removing token from localStorage:", error);
    }
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
