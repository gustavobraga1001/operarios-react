import React from "react";
import "../PopUp/PopUp.css";

const PopUpAddWorker = ({
  isClicked,
  toggleDropdown,
  NoSubmit,
  nameWorker,
}) => {
  return (
    <div className={`popup-enviar ${isClicked ? "active-popup" : ""}`}>
      <p>Você quer adicionar {nameWorker} ao setor?</p>
      <button onClick={toggleDropdown}>Ok</button>
      <button onClick={NoSubmit}>Cancelar</button>
    </div>
  );
};

export default PopUpAddWorker;
