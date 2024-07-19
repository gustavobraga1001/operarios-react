export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}`;

  return [formattedDate, formattedTime];
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const handleSchedule = (
  eventId,
  setBtnAgendar,
  date,
  time,
  sectorId,
  events,
  setError,
  showPopup,
  navigate
) => {
  setBtnAgendar("ENVIANDO...");

  if (time !== "Selecione um horário" && events.workersUp.length > 0) {
    // const formattedDate = formatDateTime(date);
    const dateTime = `${date}T${time}`;

    // Cria o objeto do evento localmente
    const newEventObject = {
      sector_id: sectorId,
      date_time: dateTime,
      workers: events.workersUp.map((worker) => worker.id),
    };

    console.log(dateTime);

    // Atualiza o estado e cria o evento
    events
      .EditScale(eventId, newEventObject)
      .then(() => {
        showPopup();
        setTimeout(() => {
          navigate("/listscale");
          setBtnAgendar("AGENDAR");
          events.setWorkersUp([]);
          events.setTime("Selecione um horário");
          setError("");
        }, 2500); // Atraso de 2 segundos
      })
      .catch(() => {
        setError("Erro ao agendar. Tente novamente.");
        setBtnAgendar("AGENDAR");
      });
  } else {
    setTimeout(() => {
      setError("Ajuste todas as opções");
      setBtnAgendar("AGENDAR");
    }, 500); // Atraso de 2 segundos
  }
};
