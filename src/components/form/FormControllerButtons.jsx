import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../context/GlobalContext";


export default function FormControllerButtons ({props}){

    const {currentVehicle} = useGlobalContext();
    const { t } = useTranslation();
    const {stepsLength, currentStep, goToNextStep, goToPrevStep} = props;
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === stepsLength - 1;


   
    return <div className="flex justify-between w-full my-3">
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
                disabled={!currentVehicle}
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