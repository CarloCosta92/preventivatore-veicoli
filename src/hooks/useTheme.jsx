export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    let currentTheme = JSON.parse(localStorage.getItem("theme"));
    if (!currentTheme) {
      localStorage.setItem("theme", "light");
      currentTheme = "light";
    }
    return currentTheme;
  });

  return {
    theme,
    setTheme,
  };
}
