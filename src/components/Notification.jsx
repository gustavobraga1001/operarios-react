import React, { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener, requestForToken } from "../../firebase";

const Notification = () => {
  const [notifications, setNotifications] = useState([]); // Lista de notificações

  // Função para exibir o toast de notificação
  const notify = useCallback((notification) => {
    toast(
      <div>
        <p>
          <b>{notification.title}</b>
        </p>
        <p>{notification.body}</p>
      </div>,
      { id: notification.id } // Use um identificador único para cada notificação
    );
  }, []);

  useEffect(() => {
    // Inicializa o token de notificação
    requestForToken();
    console.log(notifications);

    // Configura o listener para mensagens
    const unsubscribe = onMessageListener()
      .then((payload) => {
        console.log("Payload recebido: ", payload);

        const notification = {
          id: payload.messageId || new Date().getTime(), // ID único para cada notificação
          title: payload.data?.title || "Título padrão",
          body: payload.data?.body || "Corpo padrão",
        };

        // Adiciona a nova notificação ao estado
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notification,
        ]);

        // Exibe a nova notificação
        notify(notification);
      })
      .catch((err) => console.log("Erro ao escutar mensagens: ", err));

    // Limpa o listener ao desmontar o componente
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [notify, notifications]); // Certifique-se de incluir notify como dependência

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {notifications.length > 0 && (
        <div className="notification-history">
          <h4>Histórico de Notificações</h4>
          <ul>
            {notifications.map((note, index) => (
              <li key={index}>
                <strong>{note.title}</strong>: {note.body}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
