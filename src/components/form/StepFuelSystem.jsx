import { useTranslation } from "react-i18next";
import FormControllerButtons from "./FormControllerButtons";
import { useGlobalContext } from "../../context/GlobalContext";
import { useState, useEffect, useMemo } from "react"; // Aggiunto useMemo, rimosso useRef
import VehicleCard from "./VehicleCard";

// Helper function per estrarre i valori di alimentazione unici
// Non ha bisogno di essere modificata, è efficiente.
const getUniqueFuelSystems = (variations, lang) => {
  const key = lang === "it" ? "fuelSystemIt" : "fuelSystemEn";

  const allFuelTypes = variations.map((vV) => vV[key]).filter(Boolean);

  return [...new Set(allFuelTypes)].sort();
};

export default function StepFuelSystem({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  const { t, i18n } = useTranslation();
  const { currentVehicle, setCurrentVehicle } = useGlobalContext();

  const previousStepKey = `step${currentStep - 1}`;
  const currentStepKey = `step${currentStep}`;

  // --- 1. Calcolo e Memorizzazione dell'Array Base (initialVariations) ---
  // Usa la stessa logica di ereditarietà dello step EngineSize.
  const initialVariations = useMemo(() => {
    return currentStep > 1 && currentVehicle.steps[previousStepKey]
      ? currentVehicle.steps[previousStepKey]
      : currentVehicle.vehicleVariations;
  }, [
    currentStep,
    currentVehicle.steps,
    currentVehicle.vehicleVariations,
    previousStepKey,
  ]);

  // --- 2. Calcolo e Memorizzazione delle Opzioni Uniche ---
  // Calcolato solo quando initialVariations (la base) o la lingua cambiano.
  const uniqueFuelSystems = useMemo(() => {
    return getUniqueFuelSystems(initialVariations, i18n.language);
  }, [initialVariations, i18n.language]);

  // --- 3. Inizializzazione e Sincronizzazione dello Stato Locale ---

  // Trova il valore salvato: cerca il campo fuelSystemIt/En dell'array filtrato salvato.
  const langKey = i18n.language === "it" ? "fuelSystemIt" : "fuelSystemEn";
  const savedValue = currentVehicle.steps?.[currentStepKey]?.[0]?.[langKey];

  // Stato locale: Inizializzazione al primo render
  const [selectFuelSystem, setSelectFuelSystem] = useState(() => {
    if (savedValue) {
      return savedValue;
    }
    return uniqueFuelSystems[0] || "";
  });

  // Sincronizzazione: Aggiorna lo stato locale quando si naviga o cambia la lingua.
  useEffect(() => {
    if (savedValue) {
      setSelectFuelSystem(savedValue);
    } else if (uniqueFuelSystems.length > 0) {
      setSelectFuelSystem(uniqueFuelSystems[0]);
    } else {
      setSelectFuelSystem("");
    }
  }, [currentStep, savedValue, uniqueFuelSystems, i18n.language]);

  // --- 4. useEffect per Filtrare e Salvare lo Stato Globale (Nello Step) ---

  useEffect(() => {
    if (!selectFuelSystem) return;

    // Definisce le chiavi di ricerca (devono corrispondere alla chiave usata per salvare il valore nella select)
    const itKey = "fuelSystemIt";
    const enKey = "fuelSystemEn";

    // Filtra sull'array di base (initialVariations)
    const filteredVariations = initialVariations.filter((v) => {
      // La selectValue è un valore tradotto, quindi filtriamo sull'equivalente nella lingua corrente
      return v[itKey] === selectFuelSystem || v[enKey] === selectFuelSystem;
    });

    // ✅ CORREZIONE CHIAVE: Salva il filtro nell'oggetto steps, non in vehicleVariations!
    setCurrentVehicle((prevVehicle) => ({
      ...prevVehicle,
      steps: {
        ...prevVehicle.steps, // Copia gli step esistenti
        [currentStepKey]: filteredVariations, // Salva il nuovo step filtrato
      },
    }));

    // Aggiunto initialVariations e currentStepKey alle dipendenze per stabilità
  }, [selectFuelSystem, setCurrentVehicle, initialVariations, currentStepKey]);

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
              htmlFor="fuel-select"
              className="block text-xl font-semibold mb-3 text-text-default"
            >
              {t("stepFuel.description")}
            </label>

            <div className="relative">
              <select
                // ✅ Assicurati di impostare il valore corretto dallo stato locale
                value={selectFuelSystem}
                onChange={(e) => setSelectFuelSystem(e.target.value)}
                id="fuel-select"
                className="block w-full px-5 py-4 border-2 border-primary rounded-lg shadow-lg bg-bg-default text-text-default text-m md:text-xl appearance-none cursor-pointer hover:bg-bg-alt hover:border-primary-hover focus:outline-none"
              >
                {uniqueFuelSystems.map((fuelType, i) => {
                  return (
                    // Il valore deve essere la stringa tradotta
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
