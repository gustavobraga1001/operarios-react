import React, { useEffect, useRef, useState } from "react";
import "./Scales.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import iconSclales from "../../assets/icons/icon-scales.svg";
import iconClock from "../../assets/icons/icon-clock.svg";
import TimePicker from "../../components/TimePicker/TimePicker";
import { Link } from "react-router-dom";
import WorkersPicker from "../../components/WorkersPicker/WorkersPicker";
import { CalendarBlank, CaretLeft, Clock } from "@phosphor-icons/react";
import PopUp from "../../components/PopUp/PopUp";
import { useQuery } from "react-query";
import useEvents from "../../context/EventsProvider/useEvents";

const Scales = () => {
  const { workers, setWorkers, createEvent, time, setTime } = useEvents();
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState("");
  const calendarRef = useRef(null);

  const events = useEvents();

  const { data: sector, isLoading: isLoadingSector } = useQuery(
    ["sector"],
    () => events.getSector(),
    {
      staleTime: 30,
    }
  );

  const [isClicked, setIsClicked] = useState(false);

  const toggleDropdown = () => {
    setIsClicked(!isClicked);
  };

  const formatDateTime = (date) => {
    // Converte a data para uma string ISO e extrai apenas a parte da data (YYYY-MM-DD)
    return date.toISOString().split("T")[0];
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false); // Fecha o calendário após selecionar a data
    formatDateTime(date);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); // Mostra ou esconde o calendário ao clicar no input
  };

  const handleClickOutside = (event) => {
    // Fecha o calendário ao clicar fora dele
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    // Adiciona e remove o listener para fechar o calendário ao clicar fora dele
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

  // Verificação para exibir um estado de carregamento antes de renderizar o componente
  if (isLoadingSector || !sector) {
    return <h1>Loading...</h1>;
  }

  //   console.log(sector);

  const handleSchedule = () => {
    if (time !== "Selecione um horário" && events.workersUp.length > 0) {
      const formattedDate = formatDateTime(date);
      const dateTime = `${formattedDate}T${time}`;

      // Cria o objeto do evento localmente
      const newEventObject = {
        sector_id: sector.sector_id,
        date_time: dateTime,
        workers: events.workersUp.map((worker) => worker.id),
      };

      // Atualiza o estado e cria o evento
      setDate(new Date());
      events.setWorkersUp([]);
      events.setTime("Selecione um horário");
      setError("");
      events.PostScales(newEventObject);
      //   createEvent(newEventObject);
      setIsClicked(true);
    } else {
      setError("Ajuste todas as opções");
    }
  };

  return (
    <div>
      <header className="header-bottom-arrow">
        <Link to={"/optionsleader"} state={{ direction: "back" }}>
          <CaretLeft size={32} color="#ffc100" />
        </Link>
      </header>
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
            <div
              ref={calendarRef}
              style={{ position: "relative" }}
              className="scales-date-box"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "2px solid rgba(51, 54, 63, 1)",
                  borderRadius: "8px",
                  padding: "8px",
                  cursor: "pointer",
                  gap: "6px",
                }}
                onClick={toggleCalendar}
              >
                <CalendarBlank size={30} color="#ffc100" />
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
          </section>
          <section className="scales-hour">
            <p className="scales-hour-title">Horários</p>
            <div className="sclales-hour-box">
              <Clock size={32} color="#ffc100" />
              <TimePicker />
            </div>
          </section>
          <section className="scales-workers scales-hour">
            <p className="scales-hour-title">Operários</p>
            <WorkersPicker workers={sector.workers} />
          </section>
          <p>{error}</p>
          <div className="scales-button">
            <button onClick={() => handleSchedule()}>AGENDAR</button>
          </div>
        </div>
      </div>
      <PopUp isClicked={isClicked} toggleDropdown={toggleDropdown} />
    </div>
  );
};

export default Scales;
