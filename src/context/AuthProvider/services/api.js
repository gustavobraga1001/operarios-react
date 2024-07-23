import axios from "axios";
import { getUserLocalStorage } from "../util";

const apiUrl = "/api";

const Api = axios.create({
  baseURL: apiUrl,
});

// Função para obter o token de acesso do localStorage
const getAccessToken = () => localStorage.getItem("accessToken");

// Função para obter o token de refresh do localStorage
const getRefreshToken = () => localStorage.getItem("refreshToken");

// Função para definir os tokens no localStorage
const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

// Interceptor de requisição para adicionar o token de acesso
Api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false; // Indica se a atualização do token está em andamento
let refreshSubscribers = []; // Lista de funções a serem chamadas após a atualização do token

// Função para adicionar funções à lista de espera
const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

// Função para notificar todas as funções na lista de espera após a atualização do token
const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = []; // Limpa a lista após notificar todos
};

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Verifica se é um erro 401 não relacionado ao login inicial
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") // Evita interceptar a tentativa de login
    ) {
      console.log("Erro 401 detectado. Tentando atualizar o token..."); // Log para debug
      originalRequest._retry = true; // Marca a requisição como já tentada
      const refreshToken = getRefreshToken(); // Obtém o token de refresh

      if (refreshToken) {
        // Verifica se uma atualização de token já está em andamento
        if (!isRefreshing) {
          isRefreshing = true; // Define como verdadeiro para impedir múltiplas chamadas

          try {
            // Chama a API de refresh token
            const response = await axios.post(`${apiUrl}/auth/refresh-token`, {
              token: refreshToken,
            });

            const { accessToken, refreshToken } = response.data;

            console.log(accessToken, refreshToken);

            console.log("Novo token de acesso e refresh recebido"); // Log para debug

            if (accessToken) {
              // Atualiza tanto o access token quanto o refresh token no localStorage
              setTokens(accessToken, response.data.refreshToken);

              // Atualiza o header Authorization da instância do Axios
              Api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${accessToken}`;

              // Notifica todas as requisições em espera para usar o novo token
              onRefreshed(accessToken);

              // Rechama a requisição original com o novo token
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${accessToken}`;

              isRefreshing = false; // Reseta o estado de atualização

              return Api(originalRequest);
            } else {
              console.error(
                "Nenhum novo access token ou refresh token recebido."
              );
              // handleLogout();
              return Promise.reject(
                "Nenhum novo access token ou refresh token recebido."
              );
            }
          } catch (refreshError) {
            console.error("Refresh token is invalid", refreshError);
            handleLogout(); // Redireciona para a página de login
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false; // Certifique-se de resetar o estado mesmo em caso de falha
          }
        }

        // Adiciona as requisições subsequentes à fila de espera
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            // Atualiza o header Authorization da requisição original
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(Api(originalRequest)); // Rechama a requisição original
          });
        });
      } else {
        handleLogout();
        return Promise.reject("Refresh token não disponível.");
      }
    }

    // Para requisições de login falhas
    if (originalRequest.url.includes("/auth/login")) {
      // Retorna o erro normalmente para ser tratado na lógica de login
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login"; // Redireciona para a tela de login
};

export default Api;
