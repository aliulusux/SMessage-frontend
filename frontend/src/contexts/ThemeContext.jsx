import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    name: "ametist",
    bg: "bg-purple-50",
    text: "text-purple-900"
  });

  const switchTheme = (name) => {
    if (name === "buzul") setTheme({ name, bg: "bg-blue-50", text: "text-blue-900" });
    else setTheme({ name: "ametist", bg: "bg-purple-50", text: "text-purple-900" });
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
