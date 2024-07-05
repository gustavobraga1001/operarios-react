export default function FilterEvents(user, events) {
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

  const filteredEvents = findEventsByWorker(events, user.firstName);

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
        return {
          message: "Seu próximo dia de servir é:",
          days: "Hoje!",
          hour: nextEvent.date.split("T")[1].substring(0, 5), // Obtém apenas o horário HH:MM
        };
      } else {
        const nextEventDate = new Date(nextEvent.date);
        const formattedDate = nextEventDate.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        });
        return {
          message: "Seu próximo dia de servir é:",
          days: formattedDate,
          hour: nextEvent.date.split("T")[1].substring(0, 5), // Obtém apenas o horário HH:MM
        };
      }
    } else {
      return { message: "", days: "Sem eventos", hour: "" }; // Caso não haja eventos futuros
    }
  }
  return { message: "", days: "Sem eventos", hour: "" }; // Caso não haja eventos
}
