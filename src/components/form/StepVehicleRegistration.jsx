import FormControllerButtons from "./FormControllerButtons";

export default function StepVehicleRegistration({stepsLength, currentStep, goToNextStep, goToPrevStep}){

    return <label>
        <h2>Scegli l'anno di Immatricolazione</h2>

        <FormControllerButtons props={{stepsLength, currentStep, goToNextStep, goToPrevStep}}/>
    </label>
}