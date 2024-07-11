import React from "react";
import "./PopUpAddWorker.css";

const PopUpAddWorker = ({
  isClicked,
  toggleDropdown,
  NoSubmit,
  nameWorker,
}) => {
  return (
    <div className={`popup ${isClicked ? "active-popup" : ""}`}>
      <div className="popup-content">
        <p>Você quer adicionar {nameWorker} ao setor?</p>
        <button className="button add-button" onClick={toggleDropdown}>
          Adicionar
        </button>
      </div>
      <button className="button cancel-button" onClick={NoSubmit}>
        Cancelar
      </button>
    </div>
  );
};

export default PopUpAddWorker;
