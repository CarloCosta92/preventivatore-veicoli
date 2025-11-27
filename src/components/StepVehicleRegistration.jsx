export default function StepVehicleRegistration({stepsLength, currentStep, goToNextStep, goToPrevStep}){

    return <label>
        <h2>Scegli l'anno di Immatricolazione</h2>

        {currentStep !== 0 && <button>Indietro</button>}
        {currentStep !== stepsLength - 1 && <button>Continua</button>}
    </label>
}