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
  const [messageDays, setMessageDays] = useState("");
  const { getUser } = useAuth();
  const { getEvent } = useEvents();
  const [events, setEvents] = useState([]);
  const user = getUser();
  const nameFomatted = user[0].name.split(" ");

  function findEventsByWorker(events, workerName) {
    return events.filter((event) => event.workers.includes(workerName));
  }

  const filteredEvents = findEventsByWorker(events, user[0].name);

  function countDaysBetweenDates(date1, date2) {
    // Converte as datas para objetos Date
    const start = new Date(date1);
    const end = new Date(date2);

    // Calcula a diferença em milissegundos
    const diffInMs = Math.abs(end - start);

    // Converte milissegundos em dias
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  }

  const dayNow = new Date();

  const days = filteredEvents
    .map((event) => countDaysBetweenDates(dayNow, event.date))
    .filter((day) => day >= 0);

  const nextEvent = Math.min(...days);

  // if (nextEvent == 0) {
  //   setMessageDays("Hoje");
  // } else if (nextEvent == 1) {
  //   setMessageDays("em 1 dia");
  // } else {
  //   setMessageDays(`Em ${nextEvent} dias`);
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 1000 * 60 * 60); // Atualiza a cada hora

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

    setEvents(getEvent);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <div className="container-home">
      <header>
        <img src={logo} alt="Logo do aplicativo" />
      </header>
      <main className="main-home">
        <div className="helcome-home">
          <img src={image} alt="Imagem da hora atual" />
          <h1>
            {message}, {nameFomatted[1]}
          </h1>
        </div>
        <Saudacao
          message="Seu próximo dia de servir é:"
          day={messageDays}
          horario="16:00"
        />
        {user[0].role == "Lider" || user[0].role == "Dev" ? (
          <Link to={"/scales"}>
            <button className="btn-scales">
              {" "}
              <img src={iconHand} alt="" />
            </button>
          </Link>
        ) : (
          ""
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
