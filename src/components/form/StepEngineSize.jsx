import { useTranslation } from "react-i18next";
import FormControllerButtons from "./FormControllerButtons";
import { useGlobalContext } from "../../context/GlobalContext";
import VehicleCard from "./VehicleCard";
import { useEffect, useState, useMemo } from "react"; 

export default function StepEngineSize({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  
  const { t } = useTranslation();
  // Estrai solo ciò che serve per evitare dipendenze inutili (se possibile)
  const { currentVehicle, setCurrentVehicle } = useGlobalContext(); 
  
  const previousStepKey = `step${currentStep - 1}`; 
  const currentStepKey = `step${currentStep}`; 

  // --- 1. Calcolo e Memorizzazione dell'Array Base (initialVariations) ---
  // L'array base deve cambiare solo se cambiano lo step o i dati globali.
  const initialVariations = useMemo(() => {
      // Se currentStep > 1, cerca i dati filtrati dallo step precedente (N-1).
      // Altrimenti, usa l'array completo di base.
      return (currentStep > 1 && currentVehicle.steps[previousStepKey])
          ? currentVehicle.steps[previousStepKey]
          : currentVehicle.vehicleVariations;
  }, [currentStep, currentVehicle.steps, currentVehicle.vehicleVariations, previousStepKey]);

  // --- 2. Calcolo e Memorizzazione delle Opzioni Uniche (uniqueEngineSizes) ---
  // Calcolato solo quando initialVariations cambia.
  const uniqueEngineSizes = useMemo(() => {
      const engineSizes = initialVariations.map((v) => v.cc);
      // Ritorna l'array di numeri unici ordinato
      return [...new Set(engineSizes)].sort((a, b) => a - b);
  }, [initialVariations]);
    
  
  // --- 3. Inizializzazione e Sincronizzazione dello Stato Locale ---
  
  // Valore salvato per lo step corrente
  const savedValue = currentVehicle.steps?.[currentStepKey]?.[0]?.cc; 

  // Stato locale: inizializzazione eseguita solo al primo render
  const [selectEngineValue, setSelectEngineValue] = useState(() => {
      if (savedValue) {
          return savedValue.toString();
      }
      return uniqueEngineSizes[0] ? uniqueEngineSizes[0].toString() : ''; 
  });


  // Sincronizzazione: Aggiorna lo stato locale quando si naviga (currentStep cambia)
  // o quando i dati di base cambiano, assicurando che la select sia coerente.
  useEffect(() => {
    if (savedValue) {
        setSelectEngineValue(savedValue.toString());
    } else if (uniqueEngineSizes.length > 0) {
        setSelectEngineValue(uniqueEngineSizes[0].toString());
    }
  }, [currentStep, savedValue, uniqueEngineSizes]);


  // --- 4. useEffect per Filtrare e Salvare lo Stato Globale ---
  
  useEffect(()=>{

    // Filtra l'array di base (initialVariations) in base alla selezione locale
    const filteredVariations = initialVariations.filter(
      (v) => v.cc.toString() === selectEngineValue.toString() 
    );

    // Aggiorna lo stato globale con la chiave dinamica corretta
    setCurrentVehicle((prevVehicle) => {
      return {
        ...prevVehicle,
        steps : {
          // Copia gli step esistenti
          ...prevVehicle.steps,
          // Aggiunge/sovrascrive lo step corrente con le variazioni filtrate
          [currentStepKey]: filteredVariations 
        }
    }});
    
  // Dipendenze complete: Riesegui quando cambia la selezione, i dati base o lo step.
  }, [selectEngineValue, setCurrentVehicle, initialVariations, currentStepKey, currentStep]); 


  return (
  
    <div className="step-container h-full flex flex-col justify-between">
      <div className="grow flex flex-col justify-center items-center">
        <h2 className="step-container-title mb-12 text-3xl font-bold text-white">
          {t("stepEngine.title")}
        </h2>

        <div className="max-w-2xl md:max-w-4xl w-full mx-auto flex flex-col md:flex-row items-center justify-around gap-12 p-2 md:p-4">
          <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center">
            <VehicleCard vehicle={currentVehicle} />
          </div>

          <div className="w-full md:w-1/2 lg:w-2/5">
            <label
              htmlFor="engine-select"
              className="block text-xl font-semibold mb-3 text-text-default"
            >
              {t("stepEngineSize.title")}
            </label>

            <div className="relative">
              <select
                // Il valore della select è controllato dallo stato locale
                value={selectEngineValue} 
                onChange={(e)=>setSelectEngineValue(e.target.value)}
                id="engine-select"
                className="block w-full px-5 py-4 border-2 border-primary rounded-lg shadow-lg bg-bg-default text-text-default text-m md:text-xl appearance-none cursor-pointer hover:bg-bg-alt hover:border-primary-hover focus:outline-none"
              >
                {/* Mapping delle opzioni filtrate e uniche */}
                {uniqueEngineSizes.map((size, i) => {
                  return (
                    <option key={i} value={size.toString()}>
                      {size === 0 ? "Elettrico" : `${size} cc` }
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-primary">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* I pulsanti FormControllerButtons */}
      <FormControllerButtons
        props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}
      />
    </div>
  );
}