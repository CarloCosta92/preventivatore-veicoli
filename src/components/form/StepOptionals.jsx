import { useTranslation } from "react-i18next";
import FormControllerButtons from "./FormControllerButtons";

export default function StepOptionals({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  const { t } = useTranslation();

  return (
    <label>
      <h2>{t("stepOptional.title")}</h2>

      <FormControllerButtons
        props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}
      />
    </label>
  );
}
