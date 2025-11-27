import FormControllerButtons from "./FormControllerButtons";
import VehicleCard from "./VehicleCard";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../context/GlobalContext";
import { useMemo, useState } from "react";

export default function StepVehichleSelector({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  const { t } = useTranslation();

  const { error, vehicles, isLoading } = useGlobalContext();
  const [selectTypeOption, setSelectTypeOption] = useState("");

  const filteredVehicles = useMemo(() => {
    let currentVehicles = vehicles;
    if (selectTypeOption) {
      currentVehicles = vehicles.filter(
        (v) => v.vehicleType === selectTypeOption
      );
    }
    return currentVehicles;
  }, [vehicles, selectTypeOption]);

  if (error) {
    return (
      <h2 className="font-bold text-3xl text-center text-red-500">
        {t("stepVehichleSelector.error1")}
      </h2>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center align-middle">
        <h2 className=" font-bold text-3xl text-center text-text-default">
          {t("stepVehichleSelector.error2")}
        </h2>
      </div>
    );
  }

  return (
    <div className="step-container">
      <h2 className="step-container-title">{t("veichleSelector.title")}</h2>
      <div className="flex my-3">
        <select
          className="ml-auto  px-3 py-2 border-2 border-primary bg-bg-default hover:bg-bg-alt rounded-lg shadow-lg text-text-default text-xl appearance-none cursor-pointer hover:border-primary-hover focus:outline-none"
          onChange={(e) => setSelectTypeOption(e.target.value)}
          name="selectVehicleType"
          id="selectVehicleType"
        >
          <option value="">TUTTI</option>
          {[...new Set(vehicles.map((v) => v.vehicleType))].map((vT, i) => (
            <option key={i} value={vT}>
              {vT.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div
        className="
                my-4
                grow
                flex items-start 
                justify-center py-4 
                overflow-y-auto 
                scrollbar-hide
                max-h-[calc(100vh-200px)] 
            "
      >
        <div className="vehicle-card-container">
          {filteredVehicles.map((v) => {
            return <VehicleCard key={v.id} vehicle={v} />;
          })}
        </div>
      </div>
      <div className="my-4">
        <FormControllerButtons
          props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}
        />
      </div>
    </div>
  );
}
