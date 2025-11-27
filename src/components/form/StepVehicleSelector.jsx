import FormControllerButtons from "./FormControllerButtons";
import vehicles from "../../data/vehicles.json"

export default function StepVehichleSelector({stepsLength, currentStep, goToNextStep, goToPrevStep}){

    console.log(vehicles)
    return <label>
        <h2>Scegli il tuo Veicolo!</h2>


        <FormControllerButtons props={{stepsLength, currentStep, goToNextStep, goToPrevStep}}/>
    </label>
}