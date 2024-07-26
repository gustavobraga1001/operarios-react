import axios from "axios";

// const apiUrl = "/api";
const apiUrl = import.meta.env.VITE_API_URL;

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
    // Verifica se a requisição não é para o endpoint de logout
    if (!config.url.includes("/auth/logout")) {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
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
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/logout") // Evita interceptar a tentativa de login e logout
    ) {
      console.log("Erro 401 detectado. Tentando atualizar o token..."); // Log para debug
      originalRequest._retry = true; // Marca a requisição como já tentada
      const refreshToken = getRefreshToken(); // Obtém o token de refresh

      console.log(refreshToken);

      if (refreshToken) {
        // Verifica se uma atualização de token já está em andamento
        if (!isRefreshing) {
          isRefreshing = true; // Define como verdadeiro para impedir múltiplas chamadas

          try {
            // Chama a API de refresh token
            const response = await axios.post(`${apiUrl}/auth/refresh-token`, {
              token: refreshToken,
            });

            const tokens = response.data;

            if (tokens.accessToken) {
              // Atualiza tanto o access token quanto o refresh token no localStorage
              setTokens(tokens.accessToken, tokens.refreshToken);

              // Atualiza o header Authorization da instância do Axios
              Api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${tokens.accessToken}`;

              // Notifica todas as requisições em espera para usar o novo token
              onRefreshed(tokens.accessToken);

              // Rechama a requisição original com o novo token
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${tokens.accessToken}`;

              isRefreshing = false; // Reseta o estado de atualização

              return Api(originalRequest);
            } else {
              console.error(
                "Nenhum novo access token ou refresh token recebido."
              );

              return Promise.reject(
                "Nenhum novo access token ou refresh token recebido."
              );
            }
          } catch (refreshError) {
            console.error("Refresh token is invalid", refreshError);
            handleLogout();
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

    return Promise.reject(error); // Adicionado para garantir que o erro seja propagado
  }
);

const handleLogout = async () => {
  try {
    const deviceId = localStorage.getItem("device");
    const refreshToken = getRefreshToken();

    const request = await axios.post(`${apiUrl}/auth/logout`, {
      device_id: deviceId,
      refresh_token: refreshToken,
    });

    // Limpa os tokens do localStorage e redireciona para a página de login
    localStorage.clear();
    window.location.href = "/login";
    return request;
  } catch (error) {
    console.error("Erro ao realizar logout:", error);
    return null;
  }
};

export default Api;
