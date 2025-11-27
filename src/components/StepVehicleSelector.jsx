import FormControllerButtons from "./FormControllerButtons";

export default function StepVehichleSelector({stepsLength, currentStep, goToNextStep, goToPrevStep}){

    return <label>
        <h2>Scegli il tuo Veicolo!</h2>


        <FormControllerButtons props={{stepsLength, currentStep, goToNextStep, goToPrevStep}}/>
    </label>
}