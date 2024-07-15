import React, { useState } from "react";
import "./ToggleButton.css"; // Certifique-se de adicionar o CSS

const ToggleButton = () => {
  const [isOnline, setIsOnline] = useState(false);

  const toggle = () => {
    setIsOnline((prev) => !prev);
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
