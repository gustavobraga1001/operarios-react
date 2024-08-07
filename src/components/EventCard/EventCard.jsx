import { useEffect, useState } from "react";
import "./EventCard.css";
import { getIcons } from "../GetIcons/GetIcons";
import { useNavigate } from "react-router-dom";
const EventCard = ({ sectorId, description, hour, workers, onClick }) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    // Chame getIcons somente se sector não for nulo
    if (description) {
      const iconElement = getIcons(sectorId, "#000", 30);
      setIcon(iconElement);
    }
  }, [sectorId]);
  

  const workerNames = workers
    ? workers.map((worker) => worker.name).join(", ")
    : "";
  return (
    <div className="event-card" onClick={onClick}>
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
