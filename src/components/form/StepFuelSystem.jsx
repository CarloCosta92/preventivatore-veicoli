import { useTranslation } from "react-i18next";
import FormControllerButtons from "./FormControllerButtons";

export default function StepFuelSystem({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  const { t } = useTranslation();
  return (
    <label>
      <h2>{t("stepFuel.title")}</h2>

      <FormControllerButtons
        props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}
      />
    </label>
  );
}
