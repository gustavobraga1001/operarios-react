export const getUserLocalStorage = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

export const setUserLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserLocalStorage = () => {
  localStorage.removeItem("u");
};
