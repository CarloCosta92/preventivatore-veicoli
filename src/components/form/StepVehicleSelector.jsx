import FormControllerButtons from "./FormControllerButtons";
import vehicles from "../../data/vehicles.json";
import { useTranslation } from "react-i18next";

export default function StepVehichleSelector({
  stepsLength,
  currentStep,
  goToNextStep,
  goToPrevStep,
}) {
  const { t } = useTranslation();

  console.log(vehicles);
  return (
    <label className="w-full h-full flex flex-col justify-between p-4">
      <h2 className="text-text-default text-3xl text-center font-extrabold">
        {t("veichleSelector.title")}
      </h2>

      <div
        className="
                my-4
                grow
                flex items-start 
                justify-center p-4 
                overflow-y-auto 
                max-h-[calc(100vh-200px)] 
            "
      >
        <div className="vehicle-card-container">
          {vehicles.map((v) => {
            return (
              <div key={v.id} className="vehicle-card">
                {/* 1. Immagine che riempie tutta la Card */}
                <img
                  src={v.img}
                  alt={`${v.brand} - ${v.model}`}
                  className="
                                        w-full h-full object-cover transform transition duration-500 hover:scale-105** "
                />

                {/* 2. Overlay Scuro e Testo (Posizionato Assoluto) */}
                <div className="card-absolute-title">
                  <h5 className="text-xl font-bold">{v.brand}</h5>
                  <h6 className="text-md font-medium text-gray-100">
                    {v.model}
                  </h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <FormControllerButtons
        props={{ stepsLength, currentStep, goToNextStep, goToPrevStep }}
      />
    </label>
  );
}
