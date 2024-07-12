import React, { useState } from "react";
import "./PopUp.css";

const PopUp = ({ isClicked, toggleDropdown }) => {
  return (
    <div className={`popup-enviar ${isClicked ? "active-popup" : ""}`}>
      <div className="popup-content">
        <h3>Parabéns!</h3>
        <p>A escala foi lançada.</p>
        <button onClick={toggleDropdown}>Ok</button>
      </div>
    </div>
  );
};

export default PopUp;
