import React, { useEffect, useRef, useState } from "react";
import "./Scales.css";
import Calendar from "react-calendar";
import iconSclales from "../../assets/icons/icon-scales.svg";

const Scales = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const formatShortWeekday = (locale, date) => {
    const weekdays = ["S", "T", "Q", "Q", "S", "S", "D"];
    return weekdays[date.getDay()];
  };

  return (
    <div className="scales-container">
      <div className="scales-header">
        <h1>Abra uma escala</h1>
        <p>
          Selecione data, horário e informe o nome do operário para criar uma
          escala.
        </p>
      </div>
      <div className="scales-sections">
        <section className="scales-date">
          <p>Data</p>
          <div ref={calendarRef} style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "2px solid rgba(51, 54, 63, 1)",
                borderRadius: "8px",
                padding: "8px",
                cursor: "pointer",
              }}
              onClick={toggleCalendar}
            >
              <img
                src={iconSclales}
                alt="Ícone de calendário"
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
              />
              <input
                type="text"
                readOnly
                value={date.toLocaleDateString("pt-BR")}
              />
            </div>
            {showCalendar && (
              <div
                style={{ position: "absolute", top: "50px", zIndex: "1000" }}
              >
                <Calendar
                  className={"scales-calendar"}
                  onChange={handleDateChange}
                  formatShortWeekday={formatShortWeekday}
                  showNeighboringMonth={false}
                  value={date}
                  locale="pt-BR" // Define o idioma do calendário
                  navigationLabel={({ date }) => (
                    <div className="custom-navigation">
                      <span className="month-year">
                        <strong>
                          {date.toLocaleDateString("pt-BR", { month: "long" })}
                        </strong>{" "}
                        {date.getFullYear()}
                      </span>
                    </div>
                  )}
                />
              </div>
            )}
          </div>
        </section>
        <section>
          <p>Horários</p>
          <select>
            <option value="16:00">16:00</option>
          </select>
        </section>
      </div>
    </div>
  );
};

export default Scales;
