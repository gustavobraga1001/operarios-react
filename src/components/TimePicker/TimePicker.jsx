import React, { useState, useEffect } from "react";
import "./TimePicker.css"; // Estilos CSS separados
import iconArrow from "../../assets/icons/icon-arrow.svg";
import useEvents from "../../context/EventsProvider/useEvents";

const times = [
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "00:00",
];

const GridTimePicker = ({ initialTime }) => {
  const [selectedTime, setSelectedTime] = useState("Selecione um horário");
  const [isOpen, setIsOpen] = useState(false);

  const events = useEvents();

  useEffect(() => {
    // Atualiza o estado selectedTime com initialTime apenas quando initialTime mudar
    initialTime ? setSelectedTime(initialTime) : "";
    if (initialTime) events.setTime(initialTime);
  }, [initialTime]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
    setIsOpen(false);
    events.setTime(time);
  };

  return (
    <div className="grid-time-picker">
      <div
        className={`time-picker-input ${isOpen ? "active" : ""}`}
        onClick={toggleDropdown}
      >
        <span className="selected-time">{selectedTime}</span>
        <span className="icon">
          <img
            className="icon-arrow"
            src={iconArrow}
            alt="Icone de seta para baixo"
          />
        </span>
      </div>
      {isOpen && (
        <div className="time-picker-dropdown">
          {times.map((time, index) => (
            <div
              key={index}
              className="time-picker-item"
              onClick={() => handleSelectTime(time)}
            >
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GridTimePicker;
