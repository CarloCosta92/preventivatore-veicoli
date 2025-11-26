import { useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    let currentTheme = localStorage.getItem("theme");
    if (!currentTheme) {
      localStorage.setItem("theme", "light");
      currentTheme = "light";
    }
    return currentTheme;
  });

  const setDarkTheme = ()=>{
      let currentTheme = localStorage.getItem("theme");
      if(currentTheme === "dark"){
        return;
      }
      setTheme("dark");
      localStorage.setItem("theme", "dark");
  }

    const setLightTheme = ()=>{
      let currentTheme = localStorage.getItem("theme");
      if(currentTheme === "light"){
        return;
      }
      setTheme("light");
      localStorage.setItem("theme", "light");
  }

  return {
    theme,
    setDarkTheme,
    setLightTheme
  };
}
