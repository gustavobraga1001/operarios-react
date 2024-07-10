import { useContext } from "react";
import { EventsContext } from ".";

export default function useEvents() {
  const context = useContext(EventsContext);
  return context;
}
