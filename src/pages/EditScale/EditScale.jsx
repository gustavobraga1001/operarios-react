import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Api } from "../../context/AuthProvider/services/api";
import LoadingSpinner from "../../components/Loading/Loading";
import DateSelector from "../../components/DateSelector/DateSelector";
import { formatDate, formatDateTime, handleSchedule } from "./Util/Util";
import { CaretLeft, Clock } from "@phosphor-icons/react";
import GridTimePicker from "../../components/TimePicker/TimePicker";
import WorkersPicker from "../../components/WorkersPicker/WorkersPicker";
import useEvents from "../../context/EventsProvider/useEvents";
import "./EditScale.css";
import Popup from "../Members/Popup/Popup";

const EditScale = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState("");
  const [btnAgendar, setBtnAgendar] = useState("EDITAR");
  const events = useEvents();

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  async function getEvent(id) {
    try {
      const response = await Api.get(`events/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const { data: event, isLoading } = useQuery(["event"], () => getEvent(id), {
    staleTime: 30,
  });

  const { data: sector, isLoading: isLoadingSector } = useQuery(
    ["sector"],
    () => events.getSector(),
    {
      staleTime: 30,
    }
  );

  useEffect(() => {
    if (event) {
      const [initialDate] = formatDateTime(event.date_time);
      setSelectedDate(new Date(initialDate));
    }
  }, [event]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  if (!event || isLoading || !sector || isLoadingSector) {
    return <LoadingSpinner />;
  }

  const date_time = formatDateTime(event.date_time);
  return (
    <div>
      <header className="header-bottom-arrow">
        <Link to={"/listscale"} state={{ direction: "back" }}>
          <CaretLeft size={32} color="#ffc100" />
        </Link>
      </header>
      <div className="edit-scales-container">
        <h1>Editar evento {id}</h1>
        <p>Troque a data, horário ou trabalhadores</p>
        <div className="edit-scales-sections">
          <DateSelector
            initialDate={selectedDate}
            onDateChange={handleDateChange}
          />
          <div className="edit-box-scales">
            <p>Horário</p>
            <div className="sclales-hour-box">
              <Clock size={32} color="#ffc100" />
              <GridTimePicker initialTime={date_time[1]} />
            </div>
          </div>
          <div className=" edit-box-scales">
            <p>Trabalhadores</p>
            <WorkersPicker
              workers={sector.workers}
              selectedWorkers={event.workers}
            />
          </div>
          <div className="scales-button edit-event-button">
            <button
              onClick={() =>
                handleSchedule(
                  id,
                  setBtnAgendar,
                  formatDate(selectedDate),
                  events.time,
                  sector.sector_id,
                  events,
                  setError,
                  showPopup,
                  navigate
                )
              }
            >
              {btnAgendar}
            </button>
          </div>
          <p>{error}</p>
          <Popup
            message="Evento editado com sucesso"
            isVisible={isPopupVisible}
            onClose={closePopup}
          />
        </div>
      </div>
    </div>
  );
};

export default EditScale;
