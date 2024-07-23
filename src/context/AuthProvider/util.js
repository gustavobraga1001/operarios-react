import Api from "./services/api";

export function setUserLocalStorage(user) {
  localStorage.setItem("u", JSON.stringify(user));
  // localStorage.setItem("")
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("accessToken");

  return json ?? null;
}

export async function LoginRequest(email, password) {
  try {
    const request = await Api.post("/auth/login", { email, password });
    return request.data;
  } catch (error) {
    return null;
  }
}
