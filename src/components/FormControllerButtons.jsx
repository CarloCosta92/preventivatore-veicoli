export default function FormControllerButtons (props){

    const {stepsLength, currentStep, goToNextStep, goToPrevStep} = props;
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === stepsLength - 1;

    console.log(currentStep, stepsLength);
    return <div>
        {!isFirstStep && 
            <button 
                className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg"
                onClick={goToPrevStep}
            >
                Indietro
            </button>
        }
        <button 
                className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg"
                onClick={goToNextStep}
            >
                {isLastStep ? "Invia" : "Continua"}
            </button>
    </div>
}