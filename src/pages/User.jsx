import { useGlobalContext } from "../context/GlobalContext";
import { Moon, Sun } from "lucide-react";

const User = () => {
  const { theme, setDarkTheme, setLightTheme } = useGlobalContext();

  const toggleTheme = () => {
    theme === "dark" ? setLightTheme() : setDarkTheme();
  };

  return (
    <div className="min-h-[70vh] px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold">User Settings</h1>
          <p className="mt-1">
            Gestisci preferenze e personalizzazioni dell’account.
          </p>
        </div>

        <div className="shadow rounded-2xl p-6 space-y-6 transition">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Tema dell’interfaccia</h2>
              <p className="text-sm ">Scegli come visualizzare la dashboard.</p>
            </div>

            <button
              onClick={toggleTheme}
              className="relative inline-flex items-center h-9 w-16  rounded-full transition-all"
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
              className="px-4 py-2 rounded-xl hover:bg-gray-500 transition shadow"
            >
              Imposta Dark
            </button>
            <button
              onClick={setLightTheme}
              className="px-4 py-2  rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition shadow"
            >
              Imposta Light
            </button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm">
              Tema attuale:{" "}
              <span className="font-semibold capitalize">{theme}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
