import { useEffect } from "react";
import { AuthProvider } from "./contexts/auth";
import RoutesApp from "./Routes";
import { EventsProvider } from "./contexts/events";

const App = () => {
  useEffect(() => {
    
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
