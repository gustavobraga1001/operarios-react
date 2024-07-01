import { useEffect } from "react";
import { AuthProvider } from "./contexts/auth";
import RoutesApp from "./Routes";

const App = () => {
  useEffect(() => {
    const newUser = [
      {
        email: "braga@bompastor.com",
        password: "braga@bompastor",
      },
      {
        email: "almeida@bompastor.com",
        password: "almeida@bompastor",
      },
      {
        email: "torres@bompastor.com",
        password: "torres@bompastor",
      },
      {
        email: "gu@dev.com",
        password: "gu@dev",
      },
    ];
    // Verifica se já existem dados no localStorage
    const existingData = localStorage.getItem("user_bd");

    // Se não houver dados, inicializa com alguns dados padrão
    if (!existingData) {
      localStorage.setItem("users_bd", JSON.stringify(newUser));
    }
  }, []);
  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  );
};

export default App;
