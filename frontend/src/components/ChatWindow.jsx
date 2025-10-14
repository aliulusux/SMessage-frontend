import React, { useState, useRef, useEffect } from "react";
import MessageStatusIcon from "./MessageStatusIcon";

export default function ChatWindow({ messages, sendMessage, sendTyping, typingUsers }) {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!text) return;
    sendMessage(text);
    setText("");
  };

  const handleTyping = () => {
    sendTyping();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-xl h-128 bg-white rounded shadow-lg flex flex-col p-4">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-1">
            <span className="font-bold">{msg.nick}:</span>
            <span>{msg.text}</span>
            <MessageStatusIcon status={msg.status} />
          </div>
        ))}
        {typingUsers.length > 0 && <div className="italic text-gray-500">{typingUsers.join(", ")} yazıyor...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyUp={handleTyping}
          placeholder="Type a message"
          className="flex-1 border rounded px-2 py-1"
        />
        <button onClick={handleSend} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Send</button>
      </div>
    </div>
  );
}
