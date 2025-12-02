import { useTranslation } from "react-i18next";
import FormControllerButtons from "./FormControllerButtons";
import { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

export default function StepUser({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {

    const { t } = useTranslation();
    const {currentVehicle, setCurrentVehicle} = useGlobalContext();

    // Se l'utente torna indietro, recupera i dati salvati se esistono
    const currentStepKey = `step${currentStep}`;
    const savedUserData = currentVehicle.steps?.[currentStepKey]; 

    const [userData, setUserData] = useState(() => {
        // Inizializzazione basata sul contesto globale se i dati sono stati salvati
        if (savedUserData && savedUserData.name) {
            return savedUserData;
        }
        return {
            name: "",
            surname: "",
            email: ""
        };
    });

    const onChangeUserData = (e) => {
        const {name, value} = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    // --- Salvataggio Automatico dello Stato Locale nel Contesto Globale ---
    useEffect(() => {
        // Salva userData nel contesto globale ogni volta che cambia
        setCurrentVehicle((prevVehicle) => ({
            ...prevVehicle,
            steps: {
                ...prevVehicle.steps,
                [currentStepKey]: userData, // Salva l'oggetto userData completo
            },
        }));
    }, [userData, setCurrentVehicle, currentStepKey]);


    return (
      <div className="step-container h-full flex flex-col justify-between">
        <div className="grow flex flex-col justify-center items-center">
            <h2 className="step-container-title mb-8 text-3xl font-bold text-text-default">
                {t("userForm.title", "Inserisci i Dati per l'elaborazione del Preventivo")}
            </h2>

            <form className="w-full max-w-lg p-4 md:p-6 bg-bg-default rounded-xl shadow-2xl">
                
                {/* Campo Nome */}
                <div className="mb-6">
                    <label 
                        htmlFor="name" 
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        {t("userForm.nameLabel", "Nome")}
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={userData.name}
                        onChange={onChangeUserData}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                        required
                    />
                </div>

                {/* Campo Cognome */}
                <div className="mb-6">
                    <label 
                        htmlFor="surname" 
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        {t("userForm.surnameLabel", "Cognome")}
                    </label>
                    <input
                        type="text"
                        name="surname"
                        id="surname"
                        value={userData.surname}
                        onChange={onChangeUserData}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                        required
                    />
                </div>

                {/* Campo Email */}
                <div className="mb-6">
                    <label 
                        htmlFor="email" 
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        {t("userForm.emailLabel", "Indirizzo Email")}
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={userData.email}
                        onChange={onChangeUserData}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                        required
                    />
                </div>
                
            </form>
        </div>
        
        {/* I pulsanti FormControllerButtons restano in fondo */}
        <FormControllerButtons
          props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}
        />
      </div>
    );
}