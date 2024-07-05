import React, { useEffect, useRef, useState } from "react";
import "./Scales.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import iconSclales from "../../assets/icons/icon-scales.svg";
import iconClock from "../../assets/icons/icon-clock.svg";
import TimePicker from "../../components/TimePicker/TimePicker";
import btnVoltar from "../../assets/icons/btn-voltar.svg";
import { Link } from "react-router-dom";
import WorkersPicker from "../../components/WorkersPicker/WorkersPicker";
import useEvents from "../../Hooks/useEvents";
import useAuth from "../../Hooks/useAuth";

const Scales = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState("");
  const calendarRef = useRef(null);
  const { workers, setWorkers, createEvent, time, setTime } = useEvents();
  const { getUser, getSector } = useAuth();
  const [sector, setSector] = useState();
  const [newEvent, setNewEvent] = useState({
    date: "",
    description: "",
    sector: "",
  });

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

  useEffect(() => {
    const fetchSector = async () => {
      const user = getUser();
      try {
        const sector = await getSector(user.id);
        setSector(sector[0]);
      } catch (error) {
        console.error("Erro ao obter setores:", error);
      }
    };

    fetchSector();
  }, [getSector, getUser]);

  const formatShortWeekday = (locale, date) => {
    const weekdays = ["S", "T", "Q", "Q", "S", "S", "D"];
    return weekdays[date.getDay()];
  };

  const handleSchedule = () => {
    if (time != "Selecione um horário" && workers.length > 0) {
      const formattedDate = formatDateTime(date);
      const dateTime = `${formattedDate}T${time}`;

      // Cria o objeto do evento localmente
      const newEventObject = {
        sector_id: sector.id,
        date_time: dateTime,
        workers: workers.map((worker) => worker.id),
      };

      // Atualiza o estado e cria o evento
      setNewEvent(newEventObject);
      setDate(new Date());
      setWorkers([]);
      setTime("Selecione um horário");
      setError("");
      // createEvent(newEventObject);
      console.log(newEventObject);
    } else {
      setError("Ajuste todas as opções");
    }
  };

  return (
    <div className="scales-container">
      <header>
        <Link to={"/home"}>
          <img src={btnVoltar} alt="Botão de voltar de página" />
        </Link>
      </header>
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
        <section className="scales-hour">
          <p className="scales-hour-title">Horários</p>
          <div className="sclales-hour-box">
            <img
              className="icon-clock"
              src={iconClock}
              alt="Ícone de relógio"
            />
            <TimePicker />
          </div>
        </section>
        <section className="scales-workers scales-hour">
          <p className="scales-hour-title">Operários</p>
          <WorkersPicker />
        </section>
        <p>{error}</p>
        <div className="scales-button">
          <button onClick={() => handleSchedule()}>AGENDAR</button>
        </div>
      </div>
    </div>
  );
};

export default Scales;
