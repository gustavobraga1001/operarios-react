import { useEffect, useState } from "react";
import "./EventCard.css";
import { getIcons } from "../GetIcons/GetIcons";
const EventCard = ({ description, hour, workers }) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    // Chame getIcons somente se sector não for nulo
    if (description) {
      const iconElement = getIcons(description, "#000", 30);
      setIcon(iconElement);
    }
  }, [description]);

  const workerNames = workers
    ? workers.map((worker) => worker.name).join(", ")
    : "";
  return (
    <div className="event-card">
      <div className="event-card-content">
        <div className="img-cicle">{icon}</div>
        <div className="itens">
          <p>{description}</p>
          {workers ? <span>{workerNames}</span> : ""}
        </div>
      </div>
      <p className="event-hour">{hour}</p>
    </div>
  );
};

export default EventCard;
