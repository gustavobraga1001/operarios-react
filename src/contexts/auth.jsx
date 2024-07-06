import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState();

  const apiClient = axios.create({
    baseURL: "/api", // Agora você pode usar "/api" e o proxy irá redirecionar
    headers: {
      "Content-Type": "application/json",
    },
  });
  const getUsers = async () => {
    try {
      const response = await apiClient.get("/users");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados", error);
      throw error;
    }
  };

  const getSector = async (id) => {
    try {
      const response = await apiClient.get(`/sectors?leaderId=${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados", error);
      throw error;
    }
  };

  // Função de login na aplicação
  const Login = async (data) => {
    try {
      const response = await apiClient.post("/auth/login", data);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      const token = Math.random().toString(36).substring(2);
      const email = data.email;
      localStorage.setItem("user_token", JSON.stringify({ email, token }));
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar dados", error);
      throw error;
    }
  };

  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        const role = hasUser[0].role;
        localStorage.setItem(
          "user_token",
          JSON.stringify({ email, token, role })
        );
        setUser({ email, password, role });
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
    localStorage.removeItem("user");
    localStorage.removeItem("events_bd");
  };

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return user;
  };

  const signed = () => {
    const token = JSON.parse(localStorage.getItem("user_token"));

    if (token) {
      return true;
    } else {
      return false;
    }
  };

  // const signed = () => authenticated;

  return (
    <AuthContext.Provider
      value={{
        user,
        getUsers,
        setUser,
        signed,
        signin,
        signout,
        getUser,
        users,
        Login,
        getSector,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
