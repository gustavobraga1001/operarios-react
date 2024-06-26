import React from "react";
import PropTypes from "prop-types";
import "./EventCard.css";

const EventCard = ({ description, sector }) => {
  return (
    <div className="event-card">
      <div className="event-card-content">
        <div className="img-cicle"></div>
        <div className="itens">
          <p>{description}</p>
          <p>{sector}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
