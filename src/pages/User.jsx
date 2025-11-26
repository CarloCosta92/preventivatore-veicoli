import { useGlobalContext } from "../context/GlobalContext";

const User = () => {

  const {theme, setDarkTheme, setLightTheme} = useGlobalContext();
  return (
    <>
      <h1 className={theme === "dark" ? darkMode : lightMode}>pagina User</h1>
    </>
  );
};

export default User;
