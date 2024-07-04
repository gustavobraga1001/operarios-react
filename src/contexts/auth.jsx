import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setUsers(result);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };

    fetchData();
    // const users = [
    //   {
    //     name: "Gustavo Braga",
    //     email: "braga@bp.com",
    //     password: "braga@bp",
    //     role: "Lider",
    //     sector: "Midia",
    //   },
    //   {
    //     name: "Gustavo Almeida",
    //     email: "almeida@bp.com",
    //     password: "almeida@bp",
    //     role: "Operário",
    //   },
    //   {
    //     name: "Matheus Torres",
    //     email: "torres@bp.com",
    //     password: "torres@bp",
    //     role: "Lider",
    //     sector: "Organização",
    //   },
    // ];
    // // Verifica se já existem dados no localStorage
    // const existingData = localStorage.getItem("user_bd");

    // // Se não houver dados, inicializa com alguns dados padrão
    // if (!existingData) {
    //   localStorage.setItem("users_bd", JSON.stringify(users));
    // }
    // const userToken = localStorage.getItem("user_token");
    // const usersStorage = localStorage.getItem("users_bd");

    // if (userToken && usersStorage) {
    //   const hasUser = JSON.parse(usersStorage)?.filter(
    //     (user) => user.email === JSON.parse(userToken).email
    //   );

    //   if (hasUser) setUser(hasUser[0]);
    // }
  }, []);

  const apiClient = axios.create({
    baseURL: "/api", // Agora você pode usar "/api" e o proxy irá redirecionar
    headers: {
      "Content-Type": "application/json",
    },
  });
  const getData = async () => {
    try {
      const response = await apiClient.get("/users");
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
  };

  const getUser = () => {
    const users = JSON.parse(localStorage.getItem("user_token"));
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const userDefine = usersStorage?.filter(
      (user) => user.email === users.email
    );

    return userDefine;
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signout, getUser, users, Login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
