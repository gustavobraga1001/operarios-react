import React, { useState, useEffect } from "react";
import "./ToggleButton.css"; // Certifique-se de adicionar o CSS
import {
  requestForToken,
  unsubscribeFromNotifications,
} from "../../context/AuthProvider/services/firebaseConfig";
import Api from "../../context/AuthProvider/services/api";
import Notification from "../Notification";

const ToggleButton = ({ permission }) => {
  const [isOnline, setIsOnline] = useState(false);

  async function PostTokenNotify(token) {
    try {
      const request = await Api.post(`/users/allow-notifications`, {
        token: token,
      });

      console.log(request);
      localStorage.setItem("device", request.data.device_id);

      return request.data;
    } catch (error) {
      return null;
    }
  }

  async function DeleteTokenNotify(id) {
    try {
      const request = await Api.delete(`/users/block-notifications/${id}`);

      console.log(request);

      return request.data;
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    // Retrieve the saved state from localStorage
    const savedState = localStorage.getItem("notificationsEnabled");
    if (savedState !== null) {
      setIsOnline(savedState === "true");
    }
  }, []);

  const toggle = async () => {
    setIsOnline((prev) => !prev);

    if (isOnline) {
      // Unsubscribe from notifications
      await unsubscribeFromNotifications();
      localStorage.setItem("notificationsEnabled", "false");
      const deviceId = localStorage.getItem("device");

      DeleteTokenNotify(deviceId);

      localStorage.removeItem("device");
    } else {
      // Request for notification permissions and subscribe
      const permissionGranted = await requestForToken();
      if (!permissionGranted.option) {
        return;
      }
      PostTokenNotify(permissionGranted.currentToken);

      alert("Notificações ativadas");

      localStorage.setItem("notificationsEnabled", "true");
    }
  };

  return (
    <div
      className={`toggle-button ${isOnline ? "online" : "offline"}`}
      onClick={toggle}
    >
      <div className={`circle ${isOnline ? "right" : "left"}`}></div>
      <Notification />
    </div>
  );
};

export default ToggleButton;
