export default function FilterEvents(events) {
  const dayNow = new Date();
  dayNow.setHours(0, 0, 0, 0); // Remove a hora para comparação correta

  const countDaysBetweenDates = (date1, date2) => {
    const start = new Date(date1);
    const end = new Date(date2);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const diffInMs = end - start;
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  };

  // Verifica se `events` é um array e tem pelo menos um item
  if (Array.isArray(events) && events.length > 0) {
    const futureEvents = events.filter(
      (event) => new Date(event.date_time) >= dayNow
    );

    if (futureEvents.length > 0) {
      const nextEvent = futureEvents.reduce((prev, current) =>
        new Date(prev.date_time) < new Date(current.date_time) ? prev : current
      );

      const daysUntilEvent = countDaysBetweenDates(
        dayNow,
        new Date(nextEvent.date_time)
      );

      if (daysUntilEvent === 0) {
        return {
          message: "Seu próximo dia de servir é:",
          days: "Hoje!",
          hour: new Date(nextEvent.date_time).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }), // Obtém apenas o horário HH:MM
        };
      } else {
        const nextEventDate = new Date(nextEvent.date_time);
        const formattedDate = nextEventDate.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        });
        return {
          message: "Seu próximo dia de servir é:",
          days: formattedDate,
          hour: nextEventDate.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }), // Obtém apenas o horário HH:MM
        };
      }
    } else {
      return { message: "", days: "Sem eventos", hour: "" }; // Caso não haja eventos futuros
    }
  }
  return { message: "", days: "Sem eventos", hour: "" }; // Caso não haja eventos
}
