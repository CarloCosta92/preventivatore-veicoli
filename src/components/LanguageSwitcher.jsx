import { useTranslation } from "react-i18next";

// Assicurati che i percorsi corrispondano alla tua struttura delle cartelle
import itaFlag from "../assets/ita.svg";
import ukFlag from "../assets/uk.svg";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("language", langCode);
  };

  const languages = [
    { code: "it", label: "Italiano", flag: itaFlag },
    { code: "en", label: "English", flag: ukFlag },
  ];

  return (
    <div className="shadow shadow-bg-alt rounded-2xl p-6 space-y-6 transition bg-alt">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Lingua dell'Interfaccia</h2>
        </div>
        <div className="flex gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`relative inline-flex items-center justify-center h-10 w-16 rounded-full transition-all cursor-pointer border-2 ${
                currentLanguage === lang.code
                  ? "border-bg-alt opacity-100"
                  : "border-transparent opacity-40 hover:opacity-100"
              }`}
            >
              <img src={lang.flag} alt={lang.label} className="h-6 w-6" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;