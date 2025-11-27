import { useTranslation } from "react-i18next";

export default function FormControllerButtons ({props}){

    const { t } = useTranslation();
    const {stepsLength, currentStep, goToNextStep, goToPrevStep} = props;
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === stepsLength - 1;

    console.log(currentStep, stepsLength);
    return <div className="flex justify-between w-full">
        {!isFirstStep && 
            <button 
                className="default-btn"
                onClick={goToPrevStep}
            >
                {t("form.controlbutton.back")}
            </button>
        }
        <button 
                className="default-btn"
                onClick={goToNextStep}
            >
                {isLastStep ? t("form.controlbutton.send"): t("form.controlbutton.continue")}
            </button>
    </div>
}