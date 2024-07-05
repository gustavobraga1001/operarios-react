import React from "react";
import PropTypes from "prop-types";
import "./EventCard.css";
import iconeDefault from "../../assets/icons/icon-recep.svg";

const EventCard = ({ description, hour }) => {

  return (
    <div className="event-card">
      <div className="event-card-content">
        <div className="img-cicle">
          <img src={iconeDefault} alt="" />
        </div>
        <div className="itens">
          <p>{description}</p>
        </div>
      </div>
      <p className="event-hour">{hour}</p>
    </div>
  );
};

export default EventCard;
