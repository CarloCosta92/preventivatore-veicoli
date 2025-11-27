import React, { useState } from 'react';
import StepVehichleSelector from '../components/StepVehicleSelector';
import StepFuelSystem from '../components/StepFuelSystem';
import StepEngineSize from '../components/StepEngineSize';
import StepOptionals from '../components/StepOptionals'
import StepVehicleRegistration from '../components/StepVehicleRegistration'

export default function MultiStepForm(){
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({}); 

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
        setCurrentStep(prev => prev + 1);
      }
    }

  const goToPrevStep = () => {
      if (currentStep > 0) {
        setCurrentStep(prev => prev - 1);
      }
    }

  const stepWithProps = React.cloneElement(currentStepElement, {
    key: currentStep,
    formData: formData,
    setFormData: setFormData,
    currentStep: currentStep,
    stepsLength: steps.length,
    goToNextStep: goToNextStep,
    goToPrevStep: goToPrevStep
  })

  return (
    <div className="form-container">
      {stepWithProps}
    </div>
  );
};