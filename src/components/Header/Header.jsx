import { useQuery } from "react-query";
import useAuth from "../../context/AuthProvider/useAuth";
import "./Header.css";
import LoadingSpinner from "../Loading/Loading";

const Header = () => {
  const auth = useAuth();

  const { data: user, isLoading } = useQuery(["user"], () => auth.getUser(), {
    staleTime: 50000,
  });

  if (isLoading || !user) {
    return <LoadingSpinner />;
  }

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
