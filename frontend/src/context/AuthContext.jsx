import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (formData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData,
        { withCredentials: true }
      );
      setCurrentUser(res.data);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setCurrentUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
