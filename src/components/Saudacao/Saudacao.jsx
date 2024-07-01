// src/Card.jsx
import "./Saudacao.css"; // Importa os estilos CSS

const Saudacao = ({ message, day, horario }) => (
  <div className="card-container">
    <div className="content-container">
      <p className="message">{message}</p>
      <span className="day">{day}</span>
    </div>
    <span className="timestamp">{horario}</span>
  </div>
);

export default Saudacao;
