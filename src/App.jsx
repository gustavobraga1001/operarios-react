import { useEffect } from "react";
import { AuthProvider } from "./contexts/auth";
import RoutesApp from "./Routes";
import { EventsProvider } from "./contexts/events";

const App = () => {
  useEffect(() => {
    const newUser = [
      {
        name: "Gustavo Braga",
        email: "braga@bp.com",
        password: "braga@bp",
      },
      {
        name: "Gustavo Almeida",
        email: "almeida@bp.com",
        password: "almeida@bp",
      },
      {
        name: "Matheus Torres",
        email: "torres@bp.com",
        password: "torres@bp",
      },
      {
        name: "Gustavo Braga",
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
    <EventsProvider>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </EventsProvider>
  );
};

export default App;
