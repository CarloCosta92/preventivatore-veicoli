import { useTranslation } from "react-i18next";
import FormControllerButtons from "./FormControllerButtons";
import { useGlobalContext } from "../../context/GlobalContext";
import { useState, useEffect, useMemo } from "react";
import VehicleCard from "./VehicleCard";

export default function StepVehicleRegistration({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  const { t } = useTranslation();
  const { currentVehicle, setCurrentVehicle } = useGlobalContext();

  const previousStepKey = `step${currentStep - 1}`;
  const currentStepKey = `step${currentStep}`;

  // --- 1. Calcolo e Memorizzazione dell'Array Base (Input) ---
  const initialVariations = useMemo(() => {
    // Eredita il risultato filtrato dallo step precedente (N-1)
    return (currentStep > 1 && currentVehicle.steps[previousStepKey])
      ? currentVehicle.steps[previousStepKey]
      : currentVehicle.vehicleVariations; // Fallback al set totale
  }, [currentStep, currentVehicle.steps, currentVehicle.vehicleVariations, previousStepKey]);

  // --- 2. Calcolo e Memorizzazione delle Opzioni Anno ---
  const uniqueYears = useMemo(() => {
    // Estrae tutti gli anni unici dall'array base
    const years = initialVariations.map((v) => v.immatricolationYear);
    // Ordina in modo decrescente (dal più recente)
    return [...new Set(years)].sort((a, b) => b - a);
  }, [initialVariations]);

  // --- 3. Inizializzazione e Sincronizzazione dello Stato Locale ---

  // Trova il valore salvato per questo step (l'anno è un numero, lo convertiamo in stringa)
  const savedValue = currentVehicle.steps?.[currentStepKey]?.[0]?.immatricolationYear;

  // Stato locale: inizializzazione al primo render
  const [selectedYear, setSelectedYear] = useState(() => {
    if (savedValue) {
      return savedValue.toString();
    }
    // Usa il primo anno disponibile come default
    return uniqueYears[0] ? uniqueYears[0].toString() : '';
  });

  // Sincronizzazione: Aggiorna lo stato locale quando si naviga (currentStep cambia)
  useEffect(() => {
    if (savedValue) {
      setSelectedYear(savedValue.toString());
    } else if (uniqueYears.length > 0) {
      setSelectedYear(uniqueYears[0].toString());
    } else {
      setSelectedYear('');
    }
  }, [currentStep, savedValue, uniqueYears]);

  // --- 4. useEffect per Filtrare e Salvare lo Stato Globale (Output) ---

  useEffect(() => {
    if (!selectedYear) return;

    // Filtra l'array di base (initialVariations) in base all'anno selezionato
    const yearToFilter = parseInt(selectedYear); // Converti in numero per il filtro
    
    const filteredVariations = initialVariations.filter(
      (v) => v.immatricolationYear === yearToFilter
    );

    // Salva il filtro nell'oggetto steps
    setCurrentVehicle((prevVehicle) => ({
      ...prevVehicle,
      steps: {
        ...prevVehicle.steps,
        [currentStepKey]: filteredVariations,
      },
    }));
  
  // Dipendenze complete
  }, [selectedYear, setCurrentVehicle, initialVariations, currentStepKey, currentStep]);

  return (
    <div className="step-container h-full flex flex-col justify-between">
      {/* ... (JSX Omissis) ... */}
      <div className="grow flex flex-col justify-center items-center">
        <h2 className="step-container-title mb-12 text-3xl font-bold text-white">
         {t("stepYear.title")}
        </h2>

        <div className="max-w-2xl md:max-w-4xl w-full mx-auto flex flex-col md:flex-row items-center justify-around gap-12 p-2 md:p-4">
          <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center">
            <VehicleCard vehicle={currentVehicle} />
          </div>

          <div className="w-full md:w-1/2 lg:w-2/5">
            <label
              htmlFor="year-select"
              className="block text-xl font-semibold mb-3 text-text-default"
            >
              {t("stepYear.title")}
            </label>

            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                id="year-select"
                className="block w-full px-5 py-4 border-2 border-primary rounded-lg shadow-lg bg-bg-default text-text-default text-m md:text-xl appearance-none cursor-pointer hover:bg-bg-alt hover:border-primary-hover focus:outline-none"
              >
                {uniqueYears.map((year, i) => {
                  // Assicurati che l'opzione sia sempre una stringa
                  return (
                    <option key={i} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {/* ... Icona Select ... */}
            </div>
          </div>
        </div>
      </div>

      <FormControllerButtons
        props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}
      />
    </div>
  );
}