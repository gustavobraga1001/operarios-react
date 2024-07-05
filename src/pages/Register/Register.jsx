// MyComponent.jsx
import React, { useEffect, useState } from "react";
import { getData, postData, Login } from "./ApiService";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    name: "Gustavo",
    email: "gustavo@email.com",
    password: "gustavo123",
    role: "ADMIN",
  });
  const [login, setLogin] = useState({
    username: "emilys",
    password: "emilyspass",
  });
  const [user, setUser] = useState({});
  const { users } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result.users.users);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };

    fetchData();
    // console.log(users);
  }, []);

  const handleSubmit = async () => {
    try {
      const result = await Login(login);
      setUser(result);

    } catch (error) {
      console.error("Erro ao enviar dados", error);
    }
  };
  console.log(user)

  return (
    <div>
      <ul></ul>
      <p>{user.name}</p>
      <button onClick={handleSubmit}>Enviar Dados</button>
    </div>
  );
};

export default Register;
