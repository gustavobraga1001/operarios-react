import { Link } from "react-router-dom";
import "./Home.css";
import Saudacao from "../../components/Saudacao/Saudacao";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="container-home">
      <header>
        <h1>Operários</h1>
      </header>
      <main className="main-home">
        <h1>Sejá bem vindo Braga!</h1>
        <Saudacao
          message="Hoje é dia de servir!"
          setor="Recepção"
          horario="16:00 pm"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
