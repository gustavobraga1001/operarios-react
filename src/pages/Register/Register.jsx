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
    email: "gustavo@email.com",
    password: "gustavo123",
  });
  const [user, setUser] = useState({});
  const { users } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };

    console.log(users)
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const result = await Login(login);
      setUser(result);
    } catch (error) {
      console.error("Erro ao enviar dados", error);
    }
  };

  return (
    <div>
      <ul>
        {users.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <p>{user.name}</p>
      <button onClick={handleSubmit}>Enviar Dados</button>
    </div>
  );
};

export default Register;
