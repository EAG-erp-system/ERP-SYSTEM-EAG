import React, { createContext, useContext, useEffect, useState } from 'react';

// Context መፍጠር
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 1. መጀመሪያ ሲከፈት ከ localStorage ወይም ከ ሲስተም Preference መውሰድ
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // ተጠቃሚው ቀደም ብሎ ካልመረጠ የኮምፒውተሩን/ስልኩን setting ማየት
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // 2. Theme በተቀየረ ቁጥር HTML class እና localStorage ማስተካከል
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // የመረጠውን በ localStorage ማስቀመጥ
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Theme መቀየሪያ Function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. በቀላሉ በማንኛውም ቦታ ለመጠቀም የሚረዳ Custom Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}