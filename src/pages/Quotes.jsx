import { CircleX } from "lucide-react";
import { useState } from "react";
import Loader from "../components/Loader"; // Importiamo il tuo Loader
import { useTranslation } from "react-i18next";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Quotes() {
  const { t } = useTranslation();
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Inizializzo fetch come null per evitare problemi di rendering
  const [error, setError] = useState({
    fetch: null,
    email: null,
  });

  const [quotations, setQuotations] = useState([]);
  const quotesUrl = `${baseUrl}quotes`;
  const [emailInput, setEmailInput] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getQuotations = async () => {
    setIsLoading(true);
    setError((prev) => ({ ...prev, fetch: null })); // Resetta errori precedenti
    try {
      const response = await fetch(quotesUrl);
      if (!response.ok) {
        throw new Error(`Errore nella chiamata con Status ${response.status}`);
      }
      const data = await response.json();
      setQuotations(data);

      // LOGICA AGGIUNTA: Chiudo il modale se tutto va bene
      setIsClicked(false);
      setEmailInput(""); // Pulisco l'input
    } catch (err) {
      console.error(err);
      // LOGICA CORRETTA: Salvo il messaggio (stringa), non l'oggetto errore
      setError((prev) => ({ ...prev, fetch: err.message }));
    } finally {
      setIsLoading(false);
    }
  };

  const validate = () => {
    let newErrorMail = null;
    let isValid = true;

    // Controllo campo vuoto
    if (!emailInput.trim()) {
      newErrorMail = t("errors.required", "Campo obbligatorio");
      isValid = false;
    } else if (!emailRegex.test(emailInput)) {
      newErrorMail = t("errors.invalidEmail", "Email non valida");
      isValid = false;
    }

    setError((prev) => ({ ...prev, email: newErrorMail }));
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // LOGICA AGGIUNTA: Se la validazione fallisce, blocco l'invio
    if (!validate()) {
      return;
    }
    getQuotations();
  };

  // RIMOSSO: if(isLoading) return <Loader/>
  // Perché faceva sparire il modale. Ora gestiamo il loading nel bottone.

  if (error.fetch) {
    return <h3 className="text-red-700 text-2xl font-bold">{error.fetch}</h3>;
  }

  return (
    <>
      <div className="text-center p-5">
        <h1 className="font-bold text-3xl text-text-default w-full mb-5">
          I Tuoi Preventivi
        </h1>
        <div className="mx-5">
          {quotations.length > 0 ? (
            <div>lista dei tuoi preventivi</div>
          ) : (
            <h3 className="text-2xl font-bold">Ancora nessun Preventivo</h3>
          )}
        </div>
        <button
          className="default-btn m-3"
          onClick={() => setIsClicked((prev) => !prev)}
        >
          Visualizza i tuoi Preventivi
        </button>
      </div>

      {isClicked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex justify-between">
              <label className="text-sm font-medium mb-2" htmlFor="email">
                Inserisci la tua mail
              </label>
              {/* Aggiunto type="button" per evitare che invii il form */}
              <button
                type="button"
                className="text-red-800 hover:cursor-pointer hover:text-red-400 hover:scale-110"
                onClick={() => setIsClicked((prev) => !prev)}
              >
                <CircleX />
              </button>
            </div>
            <div className="text-center p-3">
              <input
                // CORRETTO QUI: Rimossa la doppia dicitura className="className={...}"
                className="w-full px-4 py-3 border rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                name="email"
                id="email"
                type="email"
                placeholder="user@email.com"
                value={emailInput}
                onBlur={validate}
                onChange={(e) => setEmailInput(e.target.value)}
                disabled={isLoading} // Blocco input se sta caricando
              />

              {error.email && (
                <div className="text-red-800 text-sm m-1">{error.email}</div>
              )}

              <button
                className="default-btn mx-3"
                type="submit"
                disabled={isLoading} // Evita doppi click
              >
                {isLoading ? "Caricamento..." : "Carica"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
