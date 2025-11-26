import { useContext, createContext } from "react";
import useTheme from "../hooks/useTheme";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const { ...themeData } = useTheme();

  return (
    <GlobalContext.Provider value={{ ...themeData }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
