import { useState, useEffect } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {

    return localStorage.getItem("theme") || "light";
  });

  const setDarkTheme = () => {
    if (theme === "dark") return; 
    setTheme("dark");
  };

  const setLightTheme = () => {
    if (theme === "light") return;
    setTheme("light");
  };

  useEffect(() => {
    const root = document.documentElement;


    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem("theme", theme);
    
  }, [theme]); 

  return {
    theme,
    setDarkTheme,
    setLightTheme
  };
}