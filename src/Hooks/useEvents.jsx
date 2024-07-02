import { useContext } from "react";
import { EventsContext } from "../contexts/events";

const useEvents = () => {
  const context = useContext(EventsContext);

  return context;
};

export default useEvents;
