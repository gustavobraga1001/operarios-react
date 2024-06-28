import "./Login.css";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container-login">
      <img src={logo} alt="" />
      <h1>Login</h1>
      <p>Entre com seu e-mail e senha</p>
      <div className="email-login">
        <input type="email" placeholder="email@domain.com" />
      </div>
      <div className="senha-login">
        <input type="password" placeholder="Senha" />
      </div>
      <div className="button-login">
        <Link to={"/home"}>
          <button type="submit">Login</button>
        </Link>
      </div>
      <div className="divisoria"></div>
      <p className="termos">
        Clicando em Login, você concorda com nossos Termos de Serviço e
        Pivacidade
      </p>
    </div>
  );
};

export default Login;
