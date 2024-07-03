import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Home.css";
import Saudacao from "../../components/Saudacao/Saudacao";
import Footer from "../../components/Footer/Footer";
import iconDia from "../../assets/icons/icon-dia.svg";
import iconTarde from "../../assets/icons/icon-tarde.svg";
import iconNoite from "../../assets/icons/icon-noite.svg";
import iconHand from "../../assets/icons/icon-hand.svg";
import logo from "../../assets/images/logo.svg";
import useAuth from "../../Hooks/useAuth";
import useEvents from "../../Hooks/useEvents";

const Home = () => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [messageDays, setMessageDays] = useState({
    message: "",
    days: "",
    hour: "",
  });
  const { getUser } = useAuth();
  const { getEvent } = useEvents();
  const [events, setEvents] = useState([]);
  const user = getUser();
  const nameFormatted = user[0].name.split(" ");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 1000 * 60 * 60); // Atualiza a cada hora

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  useEffect(() => {
    const eventsFromStorage = getEvent();
    setEvents(eventsFromStorage);
  }, [getEvent]);

  useEffect(() => {
    if (currentHour <= 12) {
      setMessage("Bom Dia");
      setImage(iconDia);
    } else if (currentHour >= 13 && currentHour <= 18) {
      setMessage("Boa Tarde");
      setImage(iconTarde);
    } else {
      setMessage("Boa Noite");
      setImage(iconNoite);
    }
  }, [currentHour]);

  useEffect(() => {
    const dayNow = new Date();
    dayNow.setHours(0, 0, 0, 0); // Remove a hora para comparação correta

    const findEventsByWorker = (events, workerName) =>
      events.filter((event) => event.workers.includes(workerName));

    const countDaysBetweenDates = (date1, date2) => {
      const start = new Date(date1);
      const end = new Date(date2);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      const diffInMs = end - start;
      return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    };

    const filteredEvents = findEventsByWorker(events, user[0].name);

    if (filteredEvents.length > 0) {
      const futureEvents = filteredEvents.filter(
        (event) => new Date(event.date) >= dayNow
      );

      if (futureEvents.length > 0) {
        const nextEvent = futureEvents.reduce((prev, current) =>
          new Date(prev.date) < new Date(current.date) ? prev : current
        );

        const daysUntilEvent = countDaysBetweenDates(
          dayNow,
          new Date(nextEvent.date)
        );

        if (daysUntilEvent === 0) {
          setMessageDays({
            message: "Seu próximo dia de servir é:",
            days: "Hoje!",
            hour: nextEvent.date.split("T")[1].substring(0, 5), // Obtém apenas o horário HH:MM
          });
        } else {
          const nextEventDate = new Date(nextEvent.date);
          const formattedDate = nextEventDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          });
          setMessageDays({
            message: "Seu próximo dia de servir é:",
            days: formattedDate,
            hour: nextEvent.date.split("T")[1].substring(0, 5), // Obtém apenas o horário HH:MM
          });
        }
      } else {
        setMessageDays({ message: "", days: "Sem eventos", hour: "" }); // Caso não haja eventos futuros
      }
    } else {
      setMessageDays({ message: "", days: "Sem futuros eventos", hour: "" }); // Caso não haja eventos filtrados
    }

    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearTimeout(timer); // Limpa o timeout para evitar problemas de memória
  }, [count]);

  return (
    <div className="container-home">
      <header>
        <img src={logo} alt="Logo do aplicativo" />
      </header>
      <main className="main-home">
        <div className="helcome-home">
          <img src={image} alt="Imagem da hora atual" />
          <h1>
            {message}, {nameFormatted[1]}
          </h1>
        </div>
        <Saudacao
          message={messageDays.message}
          day={messageDays.days}
          horario={messageDays.hour}
        />
        {(user[0].role === "Lider" || user[0].role === "Dev") && (
          <Link to={"/scales"}>
            <button className="btn-scales">
              <img src={iconHand} alt="" />
            </button>
          </Link>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
