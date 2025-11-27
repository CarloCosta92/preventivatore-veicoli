import FormControllerButtons from "./FormControllerButtons";
import VehicleCard from "./VehicleCard";
import vehicles from "../../data/vehicles.json";
import { useTranslation } from "react-i18next";

export default function StepVehichleSelector({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
  selectedVehicleId,
  setSelectedVehicleId
}) {
  const { t } = useTranslation();

  console.log(vehicles);
  return (
    <div className="w-full h-full flex flex-col justify-between p-4">
      <h2 className="text-text-default text-3xl text-center font-extrabold">
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
              <VehicleCard key={v.id} vehicle={v} selectedVehicleId={selectedVehicleId} setSelectedVehicleId={setSelectedVehicleId}/>
            );
          })}
        </div>
      </div>
      <div>
          <FormControllerButtons props={{ stepsLength, currentStep, goToNextStep, goToPrevStep, selectedVehicleId }}/>
      </div>
    </div>
  );
}
