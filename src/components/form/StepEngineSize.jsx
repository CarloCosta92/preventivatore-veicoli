import { useTranslation } from "react-i18next";
import FormControllerButtons from "./FormControllerButtons";
import { useGlobalContext } from "../../context/GlobalContext";
import VehicleCard from "./VehicleCard";



export default function StepEngineSize({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  const { t } = useTranslation();
  const {currentVehicle} = useGlobalContext();

  const engineSizes =currentVehicle.vehicleVariations.map(v => v.cc);
  const uniqueEngineSizes = [...new Set(engineSizes)].sort((a,b)=> a - b);

  console.log(uniqueEngineSizes)

  return (
    // Il contenitore principale (assumo che step-container gestisca la larghezza massima)
    <div className="step-container h-full flex flex-col justify-between">
        
        {/* Contenuto principale del form step */}
        <div className="grow flex flex-col justify-center items-center">
            
            <h2 className="step-container-title mb-12 text-3xl font-bold text-white">
                {t("stepEngine.title")}
            </h2>


            <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-row items-center justify-around gap-12 p-4">
                <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center">
                    <VehicleCard vehicle={currentVehicle}/>
                </div>

                <div className="w-full md:w-1/2 lg:w-2/5">
                    <label 
                        htmlFor="engine-select" 
                        className="block text-xl font-semibold mb-3 text-text-default"
                    >
                       Cilindrata:
                    </label>

                    <div className="relative">
                        <select 
                            id="engine-select"
                            className="block w-full px-5 py-4 border-2 border-primary rounded-lg shadow-lg bg-bg-default text-text-default text-xl appearance-none cursor-pointer hover:bg-bg-alt hover:border-primary-hover focus:outline-none"
                        >
                            {uniqueEngineSizes.map((size, i) => {
                                return <option key={i} value={size}>{size} CC</option>
                            })}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-primary">
                            <svg 
                              className="w-6 h-6" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24" 
                              xmlns="http://www.w3.org/2000/svg">
                                  <path 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round" 
                                      strokeWidth="2" 
                                      d="M19 9l-7 7-7-7">
                                  </path>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        
        {/* I pulsanti FormControllerButtons restano in fondo */}
        <FormControllerButtons
            props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}
        />
    </div>
  );
}
