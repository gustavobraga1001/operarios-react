import useAuth from "../../Hooks/useAuth";
import "./Header.css";

const Header = () => {
  const { getUser } = useAuth();

  const user = getUser();

  const nameFomatted = user.name.split(" ");

  const getName = (nome) => {
    return nome
      .filter((parte) => parte) // Remove partes vazias
      .map((parte) => parte.charAt(0))
      .join(""); // Junta as letras em uma string
  };

  const nameFirst = getName(nameFomatted);

  return (
    <header className="header-calendary">
      <div className="img-user">
        <p>{nameFirst}</p>
      </div>
      <p className="name-user">{user.name}</p>
    </header>
  );
};

export default Header;
