import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <li>
        <Link to="/calendar">Clique aqui para acessar o calendario</Link>
      </li>
    </div>
  );
};

export default Home;
