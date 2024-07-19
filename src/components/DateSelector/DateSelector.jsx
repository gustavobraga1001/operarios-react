import React, { useState, useRef, useEffect } from "react";
import { CalendarBlank } from "@phosphor-icons/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DateSelector.css";

const DateSelector = ({ initialDate, onDateChange }) => {
  const [date, setDate] = useState(new Date(initialDate));
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const normalizedDate = new Date(initialDate);
    normalizedDate.setMinutes(
      normalizedDate.getMinutes() + normalizedDate.getTimezoneOffset()
    );
    setDate(normalizedDate || new Date());
  }, [initialDate]);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false);
    if (onDateChange) onDateChange(newDate);
  };

  const formatShortWeekday = (locale, date) => {
    return date.toLocaleDateString(locale, { weekday: "short" }).charAt(0);
  };

  return (
    <div className="scales-date">
      <p>Data</p>
      <div
        ref={calendarRef}
        style={{ position: "relative" }}
        className="scales-date-box"
      >
        <div className="date-input-container" onClick={toggleCalendar}>
          <CalendarBlank size={30} color="#ffc100" />
          <input
            type="text"
            readOnly
            value={date.toLocaleDateString("pt-BR")}
          />
        </div>
        {showCalendar && (
          <div className="calendar-popup">
            <Calendar
              className="scales-calendar"
              onChange={handleDateChange}
              formatShortWeekday={formatShortWeekday}
              showNeighboringMonth={false}
              value={date}
              locale="pt-BR"
              navigationLabel={({ date }) => (
                <div className="custom-navigation">
                  <span className="month-year">
                    <strong>
                      {date.toLocaleDateString("pt-BR", {
                        month: "long",
                      })}
                    </strong>{" "}
                    {date.getFullYear()}
                  </span>
                </div>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
