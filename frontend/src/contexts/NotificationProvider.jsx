import React, { createContext } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const playNotification = () => {
    const audio = new Audio();
    audio.src = URL.createObjectURL(new Blob([new Uint8Array([0,0,0])], {type: "audio/wav"}));
    audio.play();
  };

  return (
    <NotificationContext.Provider value={{ playNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
