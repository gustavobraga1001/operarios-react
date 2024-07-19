import React, { useState } from "react";
import "./ToggleButton.css"; // Certifique-se de adicionar o CSS
import { requestForToken } from "../../context/AuthProvider/services/firebaseConfig";

const ToggleButton = () => {
  const [isOnline, setIsOnline] = useState(false);

  const toggle = () => {
    setIsOnline((prev) => !prev);
    requestForToken();
  };

  return (
    <div
      className={`toggle-button ${isOnline ? "online" : "offline"}`}
      onClick={toggle}
    >
      <div className={`circle ${isOnline ? "right" : "left"}`}></div>
    </div>
  );
};

export default ToggleButton;
