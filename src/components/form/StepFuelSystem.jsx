import FormControllerButtons from "./FormControllerButtons";

export default function StepFuelSystem({stepsLength, currentStep, goToNextStep, goToPrevStep}){

    return <label>
        <h2>Scegli l'alimentazione</h2>

       <FormControllerButtons props={{stepsLength, currentStep, goToNextStep, goToPrevStep}}/>
    </label>
}