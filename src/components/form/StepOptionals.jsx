import { useTranslation } from "react-i18next";
import FormControllerButtons from "./FormControllerButtons";
import { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

export default function StepOptionals({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {

    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const {currentVehicle, setCurrentVehicle} = useGlobalContext();
    const currentVehicleType = currentVehicle.vehicleTypeIt;

    const currentStepKey = `step${currentStep}`;
    const prevStepKey = `step${currentStep - 1}`;


    const [allOptionals, setAllOptionals] = useState([]); 
    
    const [selectedOptionals, setSelectedOptionals] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false); 

    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const OPTIONALS_URL = useMemo(() => `${BASE_URL}optionals`, [BASE_URL]);



    const getOptionals = async()=>{
      try {
        setIsLoading(true);
        const response = await fetch(OPTIONALS_URL);

        if(response.ok){
            const data = await response.json();
            setAllOptionals(data); 
        }else {
          throw new Error(`Errore nella chiamata HTTP con status: ${response.status}`);
        }
      } catch (error) {
        setError(true);
        console.error(error);
      }finally {
        setIsLoading(false);
      }
    }

    useEffect(()=>{
      getOptionals();
    }, [OPTIONALS_URL])

    const filteredOptionals = useMemo(() => {
        if (allOptionals.length === 0) return [];

        return allOptionals.filter(o => o.vehicleTypeEn === currentVehicleType);
    }, [allOptionals, currentVehicleType]);


    useEffect(() => {
        setCurrentVehicle((prevVehicle) => ({
            ...prevVehicle,
            steps: {
                ...prevVehicle.steps,
                [currentStepKey]: {
                  ...prevVehicle.steps[prevStepKey],
                  optionals: selectedOptionals
            },
                }
        }));
    }, [selectedOptionals, setCurrentVehicle, currentStepKey]);


    const toggleOptional = (optional) => {
        setSelectedOptionals(prev => {

            const isSelected = prev.some(item => item.id === optional.id); 

            if (isSelected) {
                return prev.filter(item => item.id !== optional.id);
            } else {

                return [...prev, optional]; 
            }
        });
    };

    console.log("Optioinals...", allOptionals)
    console.log("FilteredOptionals...", filteredOptionals)
    console.log("Veicolo Corrente", currentVehicle)


    if(isLoading){
      return <div>Caricamento degli Optionals in corso</div>
    }

    if(error){
      return <div>Nessun Optional Trovato</div>
    }

    return (
      <div className="step-container">
        <h2>{t("stepOptional.title")}</h2>

        <div>
          {/* Mappa le opzioni filtrate e gestisce lo stato di selezione */}
          {filteredOptionals.map(optional => (
              <div key={optional.id}>
                  <label>
                      <input
                          type="checkbox"
                          checked={selectedOptionals.some(item => item.id === optional.id)}
                          onChange={() => toggleOptional(optional)}
                      />
                      {currentLang === "it" ? optional.nameEn : optional.nameIt}
                  </label>
              </div>
          ))}
        </div>

        <FormControllerButtons
          props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}
        />
      </div>
    );
}