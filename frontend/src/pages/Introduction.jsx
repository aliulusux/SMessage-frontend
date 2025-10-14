import React, { useState } from "react";
import Slide from "../components/Slide";
import { AnimatePresence } from "framer-motion";

export default function Introduction({ onStart }) {
  const slides = [
    { title: "Welcome to SMessage", description: "Secure, private, and responsive IRC chat." },
    { title: "Multi-channel Support", description: "Join multiple channels and communicate seamlessly." },
    { title: "Themes & Notifications", description: "Ametist & Buzul themes with sound notifications." },
    { title: "Get Started", description: "Click start chat and enter your nickname & channel." },
  ];

  const [current, setCurrent] = useState(0);
  const [nick, setNick] = useState("");
  const [channel, setChannel] = useState("");

  const nextSlide = () => current < slides.length - 1 && setCurrent(current + 1);
  const handleStartChat = () => {
    if (!nick || !channel) { alert("Please enter nickname and channel!"); return; }
    onStart({ nick, channel });
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
        <text x="50%" y="50%" textAnchor="middle" fill="rgba(0,0,0,0.03)" fontSize="48" dy=".35em">SMessage</text>
        <circle cx="100" cy="100" r="80" stroke="rgba(0,0,0,0.02)" strokeWidth="2" fill="none">
          <animate attributeName="r" values="80;85;80" dur="3s" repeatCount="indefinite"/>
        </circle>
      </svg>

      <div className="relative w-full max-w-md h-128 bg-white rounded shadow-lg overflow-hidden p-4 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <Slide key={current} {...slides[current]} />
        </AnimatePresence>

        <div className="flex justify-between items-center mt-4">
          <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50" onClick={() => setCurrent(prev => Math.max(prev - 1, 0))} disabled={current===0}>Prev</button>

          {current < slides.length - 1 ? (
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={nextSlide}>Next</button>
          ) : (
            <div className="flex flex-col gap-2">
              <input value={nick} onChange={e => setNick(e.target.value)} placeholder="Enter nickname" className="border rounded px-2 py-1"/>
              <input value={channel} onChange={e => setChannel(e.target.value)} placeholder="Enter channel" className="border rounded px-2 py-1"/>
              <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleStartChat}>Start Chat</button>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-2 justify-center">
          {slides.map((_, i) => <div key={i} className={`w-3 h-3 rounded-full ${i===current?"bg-blue-500":"bg-gray-400"}`}/>)}
        </div>
      </div>
    </div>
  );
}
