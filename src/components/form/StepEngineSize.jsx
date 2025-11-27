import FormControllerButtons from "./FormControllerButtons";

export default function StepEngineSize({stepsLength, currentStep, goToNextStep, goToPrevStep}){

    return <label>
        <h2>Scegli la cilindrata</h2>

        <FormControllerButtons props={{stepsLength, currentStep, goToNextStep, goToPrevStep}}/>
    </label>
}