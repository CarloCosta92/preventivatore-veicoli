import { useTranslation } from "react-i18next";

export default function FormControllerButtons ({props}){

    const { t } = useTranslation();
    const {stepsLength, currentStep, goToNextStep, goToPrevStep, selectedVehicleId} = props;
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === stepsLength - 1;

    console.log(currentStep, stepsLength);
    return <div className="flex justify-between w-full">
        {!isFirstStep && 
            <button 
                className="default-btn"
                onClick={(e)=>{
                    e.stopPropagation()
                    goToPrevStep()
                }}
            >
                {t("form.controlbutton.back")}
            </button>
        }
        <button 
                disabled={!selectedVehicleId}
                className="default-btn ml-auto default-button:disabled"
                onClick={(e)=>{
                    e.stopPropagation()
                    goToNextStep()
                }}
            >
                {isLastStep ? t("form.controlbutton.send"): t("form.controlbutton.continue")}
        </button>
    </div>
}