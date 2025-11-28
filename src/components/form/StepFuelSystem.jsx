import { useTranslation } from "react-i18next";
import FormControllerButtons from "./FormControllerButtons";
import { useGlobalContext } from "../../context/GlobalContext";
import { useState, useEffect, useRef } from "react";
import VehicleCard from "./VehicleCard";

// Helper function per estrarre i valori di alimentazione unici
const getUniqueFuelSystems = (variations, lang) => {
  // Seleziona la chiave di traduzione corretta
  const key = lang === "it" ? "fuelSystemIt" : "fuelSystemEn";
  
  // Mappa tutte le variazioni per estrarre solo i tipi di alimentazione
  const allFuelTypes = variations
    .map(vV => vV[key])
    .filter(Boolean); // Rimuove valori nulli/undefined/vuoti

  // Ritorna l'array di valori unici e ordinati
  return [...new Set(allFuelTypes)].sort();
};


export default function StepFuelSystem({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  const { t, i18n } = useTranslation();
  const {currentVehicle, setCurrentVehicle} = useGlobalContext();
  
  // 1. Usa useRef per salvare l'array stabile delle variazioni ricevute
  const initialVariationsRef = useRef(currentVehicle.vehicleVariations);
  
  // 2. Calcola l'array delle opzioni uniche dal Ref stabile
  //    NOTA: Questo ricalcola solo se la lingua cambia (in quanto i18n.language è una dipendenza del componente)
  const uniqueFuelSystems = getUniqueFuelSystems(initialVariationsRef.current, i18n.language);

  // 3. Inizializza lo stato con il primo valore unico disponibile
  const [selectFuelSystem, setSelectFuelSystem] = useState(uniqueFuelSystems[0] || ''); // Aggiunto fallback ''

  // 4. L'useEffect ora filtra l'array stabile e aggiorna lo stato globale
  useEffect(()=>{
    if (!selectFuelSystem) return; // Non eseguire il filtro se non c'è nulla selezionato

    // Definisce le chiavi per il filtro basato sulla lingua selezionata
    const itKey = 'fuelSystemIt';
    const enKey = 'fuelSystemEn';

    // Filtra SEMPRE sull'array stabile (initialVariationsRef.current)
    const filteredVariations = initialVariationsRef.current.filter(v => {
        // Filtra se il valore selezionato corrisponde sia al campo IT che EN
        // (necessario perché la selectValue è un valore tradotto)
        return v[itKey] === selectFuelSystem || v[enKey] === selectFuelSystem;
    });

    // Aggiorna lo stato globale con il risultato filtrato
    setCurrentVehicle((prevVehicle) => ({
      ...prevVehicle,
      vehicleVariations: filteredVariations
    }));
    
  }, [selectFuelSystem, setCurrentVehicle]);

  // Gestione del ricaricamento del componente se la lingua cambia (per mostrare le opzioni corrette)
  useEffect(() => {
    // Quando la lingua cambia, aggiorna il valore selezionato per rispecchiare le nuove opzioni
    setSelectFuelSystem(uniqueFuelSystems[0] || '');
  }, [i18n.language]);

  return (
    <label className="step-container h-full flex flex-col justify-between"> 
       <div className="grow flex flex-col justify-center items-center">
              <h2 className="step-container-title mb-12 text-3xl font-bold text-white">
                {t("stepFuel.title")}
              </h2>
      
              <div className="max-w-2xl md:max-w-4xl w-full mx-auto flex flex-col md:flex-row items-center justify-around gap-12 p-2 md:p-4">
                <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center">
                  <VehicleCard vehicle={currentVehicle} />
                </div>
      
                <div className="w-full md:w-1/2 lg:w-2/5">
                  <label
                    htmlFor="fuel-select" // Modificato l'ID per coerenza
                    className="block text-xl font-semibold mb-3 text-text-default"
                  >
                    Alimentazione
                  </label>
      
                  <div className="relative">
                    <select
                      onChange={(e)=>setSelectFuelSystem(e.target.value)}
                      id="fuel-select" // Modificato l'ID per coerenza
                      className="block w-full px-5 py-4 border-2 border-primary rounded-lg shadow-lg bg-bg-default text-text-default text-m md:text-xl appearance-none cursor-pointer hover:bg-bg-alt hover:border-primary-hover focus:outline-none"
                    >
                      {/* 5. Mappa l'array delle opzioni uniche (uniqueFuelSystems) */}
                      {uniqueFuelSystems.map((fuelType, i) => {
                        return (
                          // Il valore deve essere la stringa tradotta (quella mostrata)
                          <option key={i} value={fuelType}>
                            {fuelType}
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

      <FormControllerButtons
        props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}
      />
    </label>
  );
}