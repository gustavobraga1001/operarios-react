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

// Teste da função
const dateTimeString = "2024-07-17T21:00:00";
const result = formatDateTime(dateTimeString);
console.log(result); // Saída: ['2024-07-17', '21:00']
