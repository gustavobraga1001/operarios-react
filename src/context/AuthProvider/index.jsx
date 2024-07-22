import { createContext, useEffect, useState } from "react";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";
import { useQueryClient } from "react-query";
import Api from "./services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [IsExired, setIsExpired] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function getUser() {
    try {
      const response = await Api.get("users/profile");

      return response.data;
    } catch (error) {
      // console.log(error.response.status);
    }
  }

  async function getUsers() {
    try {
      const response = await Api.get("workers");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function authenticate(email, password) {
    const response = await LoginRequest(email, password);

    if (response != null) {
      const payload = { token: response.accessToken };

      setUser(payload);
      setUserLocalStorage({
        token: response.accessToken,
        refreshToken: response.refreshToken,
      });
    } else {
      throw new Error("E-mail ou senha inválidas");
    }
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
    // Se você estiver usando um service worker para cache

    window.reload();
  }

  return (
    <AuthContext.Provider
      value={{ ...user, authenticate, logout, getUser, getUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};
