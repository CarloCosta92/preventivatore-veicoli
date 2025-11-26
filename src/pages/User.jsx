import { useGlobalContext } from "../context/GlobalContext";

const User = () => {

  const {theme, setDarkTheme, setLightTheme} = useGlobalContext();
  return (
    <>
      <h1>pagina User</h1>
      <div>
        Preferenze Tema :
        <button type="button" className="btn" onClick={setDarkTheme}>DARK</button> <button onClick={setLightTheme}>LIGHT</button>
      </div>
    </>
  );
};

export default User;
