import FormControllerButtons from "./FormControllerButtons";
import VehicleCard from "./VehicleCard";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../context/GlobalContext";
import { useMemo, useState } from "react";
import Loader from "../Loader";


export default function StepVehichleSelector({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  const { t } = useTranslation();
  const {i18n} = useTranslation();

  const { error, vehicles, isLoading } = useGlobalContext();
  const [selectTypeOption, setSelectTypeOption] = useState("");
  const vehicleTypes = [...new Set(vehicles.map((v) => {
    if(i18n.language === "it"){
      return v.vehicleTypeIt
    }
    return v.vehicleTypeEn
  }))];

  console.log(vehicles);

  const filteredVehicles = useMemo(() => {
    let currentVehicles = vehicles;
    if (selectTypeOption) {
      currentVehicles = vehicles.filter(
        (v) => v.vehicleTypeIt === selectTypeOption || v.vehicleTypeEn === selectTypeOption
      );
    }
    return currentVehicles;
  }, [vehicles, selectTypeOption]);

  if (error) {
    return (
      <h2 className="font-bold text-3xl text-center text-red-500">
        {t("stepVehicleSelector.error1")}
      </h2>
    );
  }
  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className="step-container">
      <h2 className="step-container-title">{t("stepVehicleSelector.title")}</h2>
      <div className="flex my-3">
        <select
          className="ml-auto px-3 py-2  border-2 border-primary bg-bg-default hover:bg-bg-alt rounded-lg shadow-lg text-text-default text-xl text-center font-bold appearance-none cursor-pointer hover:border-primary-hover focus:outline-none"
          onChange={(e) => setSelectTypeOption(e.target.value)}
          name="selectVehicleType"
          id="selectVehicleType"
        >
          <option value="">{t("stepVehicleSelector.all")}</option>
          {vehicleTypes.map((vT, i) => (
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
