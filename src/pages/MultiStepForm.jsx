import React, { useState } from 'react';
import StepVehichleSelector from '../components/form/StepVehicleSelector';
import StepFuelSystem from '../components/form/StepFuelSystem';
import StepEngineSize from '../components/form/StepEngineSize';
import StepOptionals from '../components/form/StepOptionals'
import StepVehicleRegistration from '../components/form/StepVehicleRegistration'
import { useGlobalContext } from '../context/GlobalContext';


export default function MultiStepForm(){
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({}); 
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const {currentVehicle} = useGlobalContext()
 

  const steps = [
    <StepVehichleSelector/>, 
    <StepEngineSize/>,
    <StepFuelSystem/>,
    <StepVehicleRegistration/>,
    <StepOptionals/> 
  ]
  const currentStepElement = steps[currentStep];


  const goToNextStep = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev =>{
          const isElectric = currentVehicle && currentVehicle.vehicleVariations.every(vV => vV.cc === 0);
          const engineCondition = prev === 1 && isElectric
          if(engineCondition){
            return prev + 2
          }
          return prev +1
        });
      }
    }

  const goToPrevStep = () => {
      if (currentStep > 0) {
        setCurrentStep(prev => {
          const isElectric = currentVehicle && currentVehicle.vehicleVariations.every(vV => vV.cc === 0);
          const engineCondition = prev === 3 && isElectric
          if(engineCondition){
            return prev - 2
          }
          return prev - 1
        });
      }
    }

  const stepWithProps = React.cloneElement(currentStepElement, {
    key: currentStep,
    formData: formData,
    setFormData: setFormData,
    currentStep: currentStep,
    stepsLength: steps.length,
    goToNextStep: goToNextStep,
    goToPrevStep: goToPrevStep,
    selectedVehicleId: selectedVehicleId,
    setSelectedVehicleId: setSelectedVehicleId
  })

  return (
    <div className="form-container">
      {stepWithProps}
    </div>
  );
};