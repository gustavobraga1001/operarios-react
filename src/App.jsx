import { AuthProvider } from "./context/AuthProvider/index";
import { EventsProvider } from "./context/EventsProvider";
import RoutesApp from "./Routes";
// import { EventsProvider } from "./contexts/events";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const client = new QueryClient();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then(function (registration) {
        console.log(
          "Service Worker registration successful with scope: ",
          registration.scope
        );
      })
      .catch(function (err) {
        console.log("Service Worker registration failed: ", err);
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
