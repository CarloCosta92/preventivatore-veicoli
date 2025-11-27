export default function StepFuelSystem({stepsLength, currentStep, goToNextStep, goToPrevStep}){

    return <label>
        <h2>Scegli l'alimentazione</h2>

        {currentStep !== 0 && <button>Indietro</button>}
        {currentStep !== stepsLength - 1 && <button>Continua</button>}
    </label>
}