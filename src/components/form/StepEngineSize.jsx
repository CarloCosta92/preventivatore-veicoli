import { useTranslation } from "react-i18next";
import FormControllerButtons from "./FormControllerButtons";
import { useGlobalContext } from "../../context/GlobalContext";
import VehicleCard from "./VehicleCard";
import { useEffect, useState, useRef } from "react"; 

export default function StepEngineSize({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  
  const { t } = useTranslation();
  const { currentVehicle, setCurrentVehicle } = useGlobalContext();
  
  // 2. Utilizza useRef per memorizzare l'array delle variazioni che ricevi in questo step.
  //    Questo array è il risultato del filtraggio dello step precedente ed è la nostra base.
  const initialVariationsRef = useRef(currentVehicle.vehicleVariations);

  // 3. Calcola le cilindrate uniche ESCLUSIVAMENTE dal Ref
  const engineSizes = initialVariationsRef.current.map((v) => v.cc);
  const uniqueEngineSizes = [...new Set(engineSizes)].sort((a, b) => a - b);
  
  // Imposta il primo valore unico come default
  const [selectEngineValue, setSelectEngineValue] = useState(uniqueEngineSizes[0]);

  // NON usare console.log(uniqueEngineSizes); in produzione

  // 4. Modifica l'useEffect per filtrare sempre l'array originale (dal Ref)
  useEffect(()=>{

    // Filtra l'array originale (stabile) e non quello nello stato (instabile)
    const filteredVariations = initialVariationsRef.current.filter(
      // Confronto come stringa per maggiore sicurezza, dato che il valore della select è una stringa
      (v) => v.cc.toString() === selectEngineValue.toString() 
    );

    // Aggiorna lo stato globale con il risultato filtrato, preparando i dati per il prossimo step
    setCurrentVehicle((prevVehicle) => ({
      ...prevVehicle,
      vehicleVariations: filteredVariations
    }));
    
  }, [selectEngineValue, setCurrentVehicle]); // Aggiunto setCurrentVehicle alle dipendenze

  return (
  
    <div className="step-container h-full flex flex-col justify-between">
      {/* ... (Resto del JSX) ... */}
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
                onChange={(e)=>setSelectEngineValue(e.target.value)}
                id="engine-select"
                className="block w-full px-5 py-4 border-2 border-primary rounded-lg shadow-lg bg-bg-default text-text-default text-m md:text-xl appearance-none cursor-pointer hover:bg-bg-alt hover:border-primary-hover focus:outline-none"
              >
                {/* Il mapping usa l'array stabile uniqueEngineSizes */}
                {uniqueEngineSizes.map((size, i) => {
                  return (
                    <option key={i} value={size}>
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

      {/* I pulsanti FormControllerButtons restano in fondo */}
      <FormControllerButtons
        props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}
      />
    </div>
  );
}