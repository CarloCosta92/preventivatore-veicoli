import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => changeLanguage("it")}
        className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
      >
        🇮🇹 IT
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
      >
        🇬🇧 EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
