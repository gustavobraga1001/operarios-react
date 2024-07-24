import { createContext, useEffect, useState } from "react";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";
import { useQueryClient } from "react-query";
import Api from "./services/api";

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
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
    } else {
      throw new Error("E-mail ou senha inválidas");
    }
  }

  async function DeleteTokenNotify(id) {
    try {
      const request = await Api.delete(`/users/block-notifications/${id}`);

      return request.data;
    } catch (error) {
      return null;
    }
  }

  const logout = async () => {
    try {
      const deviceId = localStorage.getItem("device");
      const refreshToken = localStorage.getItem("refreshToken");

      const request = await Api.post(`auth/logout`, {
        device_id: deviceId,
        refresh_token: refreshToken,
      });

      setUser(null);
      localStorage.clear();
      window.location.reload();
      return request;
    } catch (error) {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...user, authenticate, logout, getUser, getUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};
