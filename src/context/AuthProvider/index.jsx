import { createContext, useEffect, useState } from "react";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";
import { Api } from "./services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
      console.log(error);
    }
  }

  async function getUsers() {
    try {
      const response = await Api.get("users");

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
      setUserLocalStorage(payload);
    }
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
    window.location.reload();
  }

  return (
    <AuthContext.Provider
      value={{ ...user, authenticate, logout, getUser, getUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};
