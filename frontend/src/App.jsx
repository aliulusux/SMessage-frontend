import React, { useState } from "react";
import Introduction from "./pages/Introduction";
import ChatPage from "./pages/ChatPage";
import { NotificationProvider } from "./contexts/NotificationProvider";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  const [userData, setUserData] = useState(null);

  return (
    <ThemeProvider>
      <NotificationProvider>
        {!userData ? (
          <Introduction onStart={(data) => setUserData(data)} />
        ) : (
          <ChatPage userData={userData} />
        )}
      </NotificationProvider>
    </ThemeProvider>
  );
}
