import React, { useEffect } from "react";
import "./Popup.css";

const Popup = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3 segundos

      return () => clearTimeout(timer); // Limpa o timer ao desmontar
    }
  }, [isVisible, onClose]);

  return (
    <div className={`popup-members ${isVisible ? "visible" : "hidden"}`}>
      <div className="popup-content-members">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
