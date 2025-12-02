import { useContext, createContext, useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";

const GlobalContext = createContext();
const API_URL = "https://vehicle-backend-v1ur.onrender.com/api/vehicle"

const GlobalProvider = ({ children }) => {
  const { ...themeData } = useTheme();
  const [vehicles, setVehicles] = useState([]);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getVehicles = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Errore HTTP! Stato: ${response.status}`);
            }

            const data = await response.json();
            
            setVehicles(data);

        } catch (err) {
            console.error("Errore nel recupero dei veicoli:", err.message);
            setError(err.message);
            setVehicles([]); 
            
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getVehicles();
        
    }, []);



  return (
    <GlobalContext.Provider value={{ ...themeData, vehicles, error, isLoading, currentVehicle, setCurrentVehicle }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
