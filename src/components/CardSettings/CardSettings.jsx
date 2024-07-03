import React from "react";

const CardSettings = ({ icone, text }) => {
  return (
    <div>
      <icone size={32} color="#ffc100" />
      <p>{text}</p>
    </div>
  );
};

export default CardSettings;
