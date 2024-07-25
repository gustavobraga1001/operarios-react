import { useEffect } from "react";
import { AuthProvider } from "./context/AuthProvider/index";
import { EventsProvider } from "./context/EventsProvider";
import RoutesApp from "./Routes";
// import { EventsProvider } from "./contexts/events";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const client = new QueryClient();
  // Registra o Service Worker e controla atualizações
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registrado com sucesso:", registration);

      // Verifica se há uma atualização disponível
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // Notifica o usuário sobre a atualização
              console.log(
                "Nova versão disponível. Atualize a página para obter a nova versão."
              );
            } else {
              console.log("Conteúdo pré-cacheado pela primeira vez.");
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Falha ao registrar o Service Worker:", error);
    });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration);

          // Verifique se há uma nova versão do Service Worker
          if (registration.waiting) {
            console.log("Uma nova versão do Service Worker está aguardando.");
            updateServiceWorker(registration);
          }

          // Detectar atualizações no Service Worker
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  console.log(
                    "Nova atualização disponível, atualizando agora..."
                  );
                  updateServiceWorker(registration);
                } else {
                  console.log("O conteúdo foi atualizado pela primeira vez!");
                }
              }
            };
          };
        })
        .catch((err) => {
          console.error("Falha ao registrar o Service Worker:", err);
        });
    });
  }

  // Função para atualizar o Service Worker
  function updateServiceWorker(registration) {
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
    registration.waiting.addEventListener("statechange", (e) => {
      if (e.target.state === "activated") {
        console.log("Service Worker atualizado e ativado.");
        window.location.reload();
      }
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
