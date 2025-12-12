// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Varsayılan tema: dark
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // Tema değişince localStorage’a kaydedilir
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Dark → Light geçişi
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Tema renkleri
  const colors = {
    dark: {
      pageBg: "#021631",
      text: "#ffffff",
      cardBg: "#051e3e",
      navbarBg: "#021025",
      primary: "#FBBF24",
    },
    light: {
      pageBg: "#FFF9E8",        // gold–white soft
      text: "#1a1a1a",
      cardBg: "#ffffff",
      navbarBg: "#FFE8A3",
      primary: "#D97706",
    },
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors: colors[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook: useTheme()
export const useTheme = () => useContext(ThemeContext);
