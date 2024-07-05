// apiService.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api", // Agora você pode usar "/api" e o proxy irá redirecionar
  headers: {
    "Content-Type": "application/json",
  },
});

// Exemplo de requisição GET
export const getData = async () => {
  try {
    const response = await apiClient.get("users");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados", error);
    throw error;
  }
};

// Exemplo de requisição POST
export const postData = async (data) => {
  try {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar dados", error);
    throw error;
  }
};

export const Login = async (data) => {
  try {
    console.log("Dados enviados:", data);
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar dados", error);
    throw error;
  }
};
