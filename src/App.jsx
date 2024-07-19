import { useEffect } from "react";
import { AuthProvider } from "./context/AuthProvider/index";
import { EventsProvider } from "./context/EventsProvider";
import RoutesApp from "./Routes";
// import { EventsProvider } from "./contexts/events";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const client = new QueryClient();
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso: ", registration);
        })
        .catch((error) => {
          console.log("Falha ao registrar o Service Worker: ", error);
        });
    });
  }

  return (
    <AuthProvider>
      <EventsProvider>
        <QueryClientProvider client={client}>
          <RoutesApp />
        </QueryClientProvider>
      </EventsProvider>
    </AuthProvider>
  );
};

export default App;
