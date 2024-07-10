import { AuthProvider } from "./context/AuthProvider/index";
import { EventsProvider } from "./context/EventsProvider";
import RoutesApp from "./Routes";
// import { EventsProvider } from "./contexts/events";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const client = new QueryClient();
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
