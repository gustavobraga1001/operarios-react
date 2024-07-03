import React from "react";
import PropTypes from "prop-types";
import "./EventCard.css";
import iconeDefault from "../../assets/icons/icon-recep.svg";
import useAuth from "../../Hooks/useAuth";

const EventCard = ({ description, hour, workers }) => {
  const { getUser } = useAuth();
  const user = getUser();

  const workersNames = workers.join(", ");
  return (
    <div className="event-card">
      <div className="event-card-content">
        <div className="img-cicle">
          <img src={iconeDefault} alt="" />
        </div>
        <div className="itens">
          <p>{description}</p>
          {user[0].role == "Lider" ? <span>{workersNames}</span> : ""}
        </div>
      </div>
      <p className="event-hour">{hour}</p>
    </div>
  );
};

export default EventCard;
