// src/Card.jsx
import "./Saudacao.css"; // Importa os estilos CSS

const Saudacao = ({ message, setor, horario }) => (
  <div className="card-container">
    <div className="content-container">
      <p className="message">{message}</p>
      <span className="setor">{setor}</span>
    </div>
    <span className="timestamp">{horario}</span>
  </div>
);

export default Saudacao;
