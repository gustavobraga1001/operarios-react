import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "../firebase";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  // Função para exibir notificação
  const notify = () => {
    toast(<ToastDisplay />);
  };

  // Componente de exibição de toast
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    // Solicita permissão para notificações ao montar o componente
    requestForToken()
      .then(({ option, currentToken }) => {
        if (!option) {
          console.warn("Permissão para notificações não foi concedida.");
        } else {
          console.log("Token de notificação:", currentToken);
        }
      })
      .catch((err) => console.error("Erro ao solicitar token:", err));

    // Listener para mensagens em primeiro plano
    onMessageListener()
      .then((payload) => {
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
        });
      })
      .catch((err) => console.error("Erro ao ouvir mensagens:", err));
  }, []);

  // Exibe a notificação quando o estado do notification é atualizado
  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  return <Toaster />;
};

export default Notification;
