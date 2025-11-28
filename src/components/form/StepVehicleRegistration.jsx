import { useTranslation } from "react-i18next";
import FormControllerButtons from "./FormControllerButtons";

export default function StepVehicleRegistration({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  const { t } = useTranslation();

  return (
    <label className="step-container">
      <h2 className="step-container-title">{t("stepYear.title")}</h2>

      <FormControllerButtons
        props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}
      />
    </label>
  );
}
