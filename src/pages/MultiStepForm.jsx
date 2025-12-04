import React, { useState } from "react";
import StepVehichleSelector from "../components/form/StepVehicleSelector";
import StepFuelSystem from "../components/form/StepFuelSystem";
import StepEngineSize from "../components/form/StepEngineSize";
import StepOptionals from "../components/form/StepOptionals";
import StepVehicleRegistration from "../components/form/StepVehicleRegistration";
import StepUser from "../components/form/StepUser";
import { useGlobalContext } from "../context/GlobalContext";
import CenterModal from "../components/modal/CenterModal";
import { NavLink } from "react-router-dom";
import { R_HOME, R_USER } from "../data/Path";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isResponseOk, setIsResponseOk] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const { currentVehicle } = useGlobalContext();

  const steps = [
    <StepVehichleSelector />,
    <StepEngineSize />,
    <StepFuelSystem />,
    <StepVehicleRegistration />,
    <StepOptionals />,
    <StepUser />,
  ];
  const currentStepElement = steps[currentStep];

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => {
        const isElectric =
          currentVehicle &&
          currentVehicle.vehicleVariations.every((vV) => vV.cc === 0);
        const engineCondition = prev === 1 && isElectric;
        if (engineCondition) {
          return prev + 2;
        }
        return prev + 1;
      });
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => {
        const isElectric =
          currentVehicle &&
          currentVehicle.vehicleVariations.every((vV) => vV.cc === 0);
        const engineCondition = prev === 3 && isElectric;
        if (engineCondition) {
          return prev - 2;
        }
        return prev - 1;
      });
    }
  };

  const stepWithProps = React.cloneElement(currentStepElement, {
    key: currentStep,
    formData: formData,
    setFormData: setFormData,
    currentStep: currentStep,
    stepsLength: steps.length,
    goToNextStep: goToNextStep,
    goToPrevStep: goToPrevStep,
    selectedVehicleId: selectedVehicleId,
    setSelectedVehicleId: setSelectedVehicleId,
    setIsResponseOk: setIsResponseOk,
    setIsModalVisible: setIsModalVisible,
  });

  return (
    <>
      <div className="form-container">{stepWithProps}</div>
      {isModalVisible && (
        <CenterModal>
          {isResponseOk ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-default mb-6">
                Creazione preventivo avvenuta con successo
              </h3>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <NavLink
                  to={R_USER}
                  className="bg-primary hover:bg-primary-hover  font-semibold px-6 py-2 rounded-lg transition"
                >
                  Visualizza i tuoi preventivi
                </NavLink>
                <NavLink
                  to={R_HOME}
                  className="bg-gray-400 hover:bg-gray-500  font-semibold px-6 py-2 rounded-lg transition"
                >
                  Genera un altro preventivo
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-default mb-6">
                Creazione preventivo fallita
              </h3>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <NavLink
                  to={R_HOME}
                  className="bg-primary hover:bg-gray-500  font-semibold px-6 py-2 rounded-lg transition"
                >
                  Genera un altro preventivo
                </NavLink>
              </div>
            </div>
          )}
        </CenterModal>
      )}
    </>
  );
}
