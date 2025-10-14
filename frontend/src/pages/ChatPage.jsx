import React, { useEffect, useState, useRef, useContext } from "react";
import ChatWindow from "../components/ChatWindow";
import { NotificationContext } from "../contexts/NotificationProvider";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ChatPage({ userData }) {
  const ws = useRef(null);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const { playNotification } = useContext(NotificationContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    ws.current = new WebSocket("wss://localhost:3001");

    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ type: "register", nick: userData.nick }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        setMessages(prev => [...prev, data]);
        playNotification();
      }

      if (data.type === "typing") {
        setTypingUsers(data.typingUsers.filter(nick => nick !== userData.nick));
      }

      if (data.type === "error") {
        alert(data.message);
      }
    };

    return () => ws.current.close();
  }, [userData]);

  const sendMessage = (text) => {
    ws.current.send(JSON.stringify({ type: "message", text, nick: userData.nick, channel: userData.channel }));
  };

  const sendTyping = () => {
    ws.current.send(JSON.stringify({ type: "typing", nick: userData.nick }));
  };

  return (
    <div className={`h-screen w-screen flex flex-col items-center justify-center ${theme.bg}`}>
      <ChatWindow messages={messages} sendMessage={sendMessage} sendTyping={sendTyping} typingUsers={typingUsers} />
    </div>
  );
}
