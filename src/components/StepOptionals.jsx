export default function StepOptionals({stepsLength, currentStep, goToNextStep, goToPrevStep}){

    return <label>
        <h2>Scegli la cilindrata</h2>

        {currentStep !== 0 && <button>Indietro</button>}
        {currentStep !== stepsLength - 1 && <button>Continua</button>}
    </label>
}