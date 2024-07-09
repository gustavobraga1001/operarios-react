import "./Login.css";
import logo from "../../assets/images/logo.svg";
import { useState } from "react";
import useAuth from "../../context/AuthProvider/useAuth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  async function onFinish() {
    try {
      await auth.authenticate(email, password);
      // Navigate("/home");
    } catch (error) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
      console.log(error);
    }
  }

  return (
    <div className="container-login">
      <img src={logo} alt="" />
      <h1>Login</h1>
      <p>Entre com seu e-mail e senha</p>
      <div className="email-login">
        <input
          type="email"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
      </div>
      <div className="senha-login">
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
        />
      </div>
      <p>{error}</p>
      <div className="button-login">
        <button type="submit" onClick={onFinish}>
          Login
        </button>
      </div>

      <div className="divisoria"></div>
      <p className="termos">
        Clicando em Login, você concorda com nossos Termos de Serviço e
        Privacidade
      </p>
    </div>
  );
};

export default Login;
