// /src/context/AuthProvider/useAuth.js
import { useContext } from "react";
import { AuthContext } from ".";

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default useAuth;
