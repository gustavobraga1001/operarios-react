import "./Login.css";
import logo from "../../assets/images/logo.svg";
import { useState, useContext } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { Login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }
    try {
      const result = await Login({
        email: email,
        password: senha,
      });
      navigate("/home");
    } catch (error) {
      console.error("Erro ao enviar dados", error);
    }
  };

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
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
      </div>
      <p>{error}</p>
      <div className="button-login">
        <button type="submit" onClick={handleLogin}>
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
