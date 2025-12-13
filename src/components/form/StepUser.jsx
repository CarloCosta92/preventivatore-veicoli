import { useTranslation } from "react-i18next";
import FormControllerButtons from "./FormControllerButtons";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

export default function StepUser({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
  setIsResponseOk,
  setIsModalVisible,
}) {
  const { t } = useTranslation();
  const { currentVehicle} = useGlobalContext();
  const [errors, setErrors] = useState({});

  const currentStepKey = `step${currentStep}`;
  const prevOptionalsStepKey = `step${currentStep - 2}`;
  const savedUserData = currentVehicle.steps?.[currentStepKey];

  const [userData, setUserData] = useState(() => {
    if (savedUserData && savedUserData.name) {
      return savedUserData;
    }
    return { name: "", surname: "", email: "" };
  });

  const onChangeUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // --- 1. Logica di Validazione ---
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userData.name.trim())
      newErrors.name = t("errors.required", "Campo obbligatorio");
    if (!userData.surname.trim())
      newErrors.surname = t("errors.required", "Campo obbligatorio");
    if (!userData.email.trim()) {
      newErrors.email = t("errors.required", "Campo obbligatorio");
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = t("errors.invalidEmail", "Email non valida");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const prepareDataForSubmission = () => {
    if (!validateForm()) {
      return null;
    }

    const formDataFormatted = {
      "userName": userData.name,
      "userSurname": userData.surname,
      "userMail": userData.email,
      "userEmail": userData.email,
      vehicleDTOToQuoted: [
        {
          id: currentVehicle.id,
        },
      ],
      vehicleVariationId: currentVehicle.steps[prevOptionalsStepKey][0].id,
      optionalDTOtoQuoted: currentVehicle.optionals.map((o) => ({ id: o.id })),
    };

    console.log(currentVehicle.steps, "STEPS");
    console.log(currentVehicle.steps[prevOptionalsStepKey], "ULTIMO STEP");
    console.log(
      currentVehicle.steps[prevOptionalsStepKey][0],
      "Prima Variazione dell'Ultimo Step"
    );

    return formDataFormatted;
  };

  return (
    <div className="step-container h-full flex flex-col justify-between">
      <div className="grow flex flex-col justify-center items-center">
        <h2 className="step-container-title mb-8 text-3xl font-bold text-text-default">
          {t("userForm.title", "I tuoi dati")}
        </h2>

        <form className="w-full max-w-lg p-4 md:p-6  rounded-xl shadow-md mb-3 shadow-bg-alt">
          {/* NAME */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {t("userForm.nameLabel", "Nome")}
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={onChangeUserData}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-primary focus:border-primary transition duration-150 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* SURNAME */}
          <div className="mb-6">
            <label htmlFor="surname" className="block text-sm font-medium mb-2">
              {t("userForm.surnameLabel", "Cognome")}
            </label>
            <input
              type="text"
              name="surname"
              value={userData.surname}
              onChange={onChangeUserData}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-primary focus:border-primary transition duration-150 ${
                errors.surname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.surname && (
              <p className="text-red-500 text-xs mt-1">{errors.surname}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t("userForm.emailLabel", "Email")}
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={onChangeUserData}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-primary focus:border-primary transition duration-150 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </form>
      </div>

      <FormControllerButtons
        props={{
          stepsLength,
          currentStep,
          goToNextStep,
          goToPrevStep,
          getSubmissionData: prepareDataForSubmission,
          setIsResponseOk,
          setIsModalVisible,
        }}
      />
    </div>
  );
}
