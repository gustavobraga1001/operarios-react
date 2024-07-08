import React, { useState } from "react";
import "./PopUp.css";

const PopUp = ({ state, text }) => {
  return (
    <div>
      <div className={`popup-enviar ${state ? "active-popup" : ""}`}>
        <p>{text}</p>
        <button>Ok</button>
      </div>
    </div>
  );
};

export default PopUp;
