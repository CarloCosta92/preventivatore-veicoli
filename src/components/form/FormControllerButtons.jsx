import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../context/GlobalContext";


export default function FormControllerButtons ({props}){

    const {currentVehicle} = useGlobalContext();
    const { t } = useTranslation();
    const {stepsLength, currentStep, goToNextStep, goToPrevStep, getSubmissionData} = props;
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === stepsLength - 1;
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const handleNextClick = async(e)=>{
        e.stopPropagation()
        if (isLastStep) {
            const formData = getSubmissionData ? getSubmissionData() : null;
            if (!formData) {
                return; 
            }
            console.log(formData);
            try {
                const response = await fetch(`${baseUrl}/quotation`, {
                    method: 'POST',
                    body: formData 
                });
                if(!response.ok){
                    throw new Error(`Errore nell'invio dei Dati per il Preventivo, STATUS: ${response.status}`)
                }
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        } else {
            goToNextStep();
        }
        };


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
            className={`default-btn ml-auto default-button:disabled ${isLastStep && "text-3xl p-4"}`}
            onClick={(e)=>handleNextClick(e)}
        >
            {isLastStep ? t("form.controlbutton.send"): t("form.controlbutton.continue")}
        </button>
    </div>
}