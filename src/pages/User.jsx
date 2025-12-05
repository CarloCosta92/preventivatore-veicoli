import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../context/GlobalContext";
import { Moon, Sun } from "lucide-react";
import LanguageSwitcher from "../components/LanguageSwitcher";

const User = () => {
  const { t } = useTranslation();
  const { theme, setDarkTheme, setLightTheme } = useGlobalContext();

  const toggleTheme = () => {
    theme === "dark" ? setLightTheme() : setDarkTheme();
  };

  return (
    <div className="min-h-[70vh] px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold">{t("userSettings.title")}</h1>
          <p className="mt-1">{t("userSettings.description")}</p>
        </div>

        <div className="shadow rounded-2xl p-6 space-y-6 transition">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">
                {t("userSettings.themeTitle")}
              </h2>
              <p className="text-sm "> {t("userSettings.themeDescription")}</p>
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
                {theme === "dark" ? (
                  <Moon className="w-4 h-4 text-gray-500" />
                ) : (
                  <Sun className="w-4 h-4 text-yellow-500" />
                )}
              </span>
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={setDarkTheme}
              className="px-4 py-2 rounded-xl hover:bg-gray-500 transition shadow hover:cursor-pointer"
            >
              {t("userSettings.dark")}
            </button>
            <button
              onClick={setLightTheme}
              className="px-4 py-2  rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition shadow hover:cursor-pointer"
            >
              {t("userSettings.light")}
            </button>
          </div>
        </div>
        <LanguageSwitcher/>
      </div>
    </div>
  );
};

export default User;
