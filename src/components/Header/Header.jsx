import { Link } from "react-router-dom";
import "./Header.css";
import btnVoltar from "../../assets/icons/btn-voltar.svg";

const Header = () => {
  return (
    <header className="header-calendary">
      <div className="back">
        <Link to="/">
          <img src={btnVoltar} alt="Botão de voltar de página" />
        </Link>
      </div>
      <div className="img-user">
        <p>GB</p>
      </div>
      <p className="name-user">Gustavo braga</p>
    </header>
  );
};

export default Header;
