import FormControllerButtons from "./FormControllerButtons";
import VehicleCard from "./VehicleCard";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../context/GlobalContext";

export default function StepVehichleSelector({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  const { t } = useTranslation();

  const {error, vehicles, isLoading} = useGlobalContext();

   if(error){
    return <h2 className="font-bold text-3xl text-center text-red-500">Errore: Nessun Veicolo trovato</h2>
  }
  if(isLoading){
    return <h2 className="font-bold text-3xl text-center text-blue-400">Caricamento Veicoli in Corso</h2>
  }

 

  return (
    <div className="step-container">
      <h2 className="step-container-title">
        {t("veichleSelector.title")}
      </h2>

  

      <div
        className="
                my-4
                grow
                flex items-start 
                justify-center p-4 
                overflow-y-auto 
                max-h-[calc(100vh-200px)] 
            "
      >
        <div className="vehicle-card-container">
          {vehicles.map((v) => {
            return (
              <VehicleCard key={v.id} vehicle={v}/>
            );
          })}
        </div>
      </div>
      <div>
          <FormControllerButtons props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}/>
      </div>
    </div>
  );
}
