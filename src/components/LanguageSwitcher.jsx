import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  // Ottiene l'istanza i18n per cambiare lingua e la lingua corrente
  const { i18n } = useTranslation();
  
  // Ottiene la lingua attualmente impostata
  const currentLanguage = i18n.language; 

  // Funzione che gestisce il cambio lingua
  // L'evento 'e' è l'evento di cambio del tag <select>
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    // Salva la scelta in localStorage (ottima pratica!)
    localStorage.setItem("language", newLang);
  };

  // Definisci le opzioni disponibili in un array per chiarezza
  const languages = [
    { code: "it", label: "🇮🇹" },
    { code: "en", label: "🇬🇧" },
    // Puoi aggiungere altre lingue qui, es. { code: "es", label: "Español 🇪🇸" }
  ];


  const THEMELANGUAGE = <div className="shadow rounded-2xl p-6 space-y-6 transition">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">
                Lingua dell'Interfaccia
              </h2>
            </div>

            <button
              onClick={toggleTheme}
              className="relative inline-flex items-center h-9 w-16 bg-gray-200 rounded-full transition-all hover:cursor-pointer"
            >
              <span
                className={`absolute left-1 top-1 h-7 w-7 rounded-full  shadow transform transition-all flex items-center justify-center ${
                  theme === "dark" ? "translate-x-7" : ""
                }`}
              >
              </span>
            </button>
          </div>
        </div>
  return (
    <div className="">
      <label htmlFor="language-select" className="sr-only">Scegli la lingua</label>
      <select
        id="language-select"
        // Imposta la lingua selezionata corrente
        value={currentLanguage}
        // Chiama la funzione di cambio quando il valore cambia
        onChange={handleLanguageChange}
        // Tailwind classes per lo stile del menu a discesa
        className=" bg-gray-900 px-2 py-1 border rounded-md transition duration-300 hover:scale-110 transform block focus:outline-none cursor-pointer appearance-none"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;