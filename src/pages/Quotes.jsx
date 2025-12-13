import { CircleX } from "lucide-react";
import { useState } from "react";
import Loader from "../components/Loader"; // Importiamo il tuo Loader
import { useTranslation } from "react-i18next";
import { img } from "framer-motion/client";

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
  const searchUrl = `${baseUrl}quotation/search?mail=`;
  const [emailInput, setEmailInput] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getQuotations = async (email) => {
    setIsLoading(true);
    setError((prev) => ({ ...prev, fetch: null })); // Resetta errori precedenti
    try {
      const response = await fetch(`${searchUrl}${email}`);
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
    getQuotations(emailInput);
  };

  const openPdf = async (id) => {
    try {
      const response = await fetch(`${baseUrl}quotation/${id}/pdf`);
      if(!response.ok){
        throw new Error(`Errore nel caricamento del Preventivo con status ${response.status}`);
      }
      console.log(response)
      const blob = await response.blob();
      console.log(blob)
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      window.open(url, '_blank');
      // Pulisci memoria
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Errore nel caricamento del Preventivo del PDF")
    }
  }

    console.log(quotations);
  // RIMOSSO: if(isLoading) return <Loader/>
  // Perché faceva sparire il modale. Ora gestiamo il loading nel bottone.

  if (error.fetch) {
    return <h3 className="text-red-700 text-2xl font-bold">{error.fetch}</h3>;
  }

  return (
    <>
      <div className="text-center p-5">
        <h1 className="font-bold text-5xl text-text-default w-full mb-5">
          I Tuoi Preventivi
        </h1>
        <div className="mx-5">
          {quotations.length > 0 ? (
  <div className="flex flex-wrap justify-center gap-6 p-4">
    {quotations.map((q) => (
      <div 
        key={q.id} 
        className="flex flex-col items-center justify-between w-64 bg-alt border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
      >
        {/* Intestazione Card: Dati Veicolo */}
        <div className="text-center mb-4">
          <h5 className="text-xl font-bold text-gray-800">
            {q.vehicleDTOToQuoted?.[0]?.brand || "Brand sconosciuto"}
          </h5>
          <h6 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {q.vehicleDTOToQuoted?.[0]?.model || "Modello sconosciuto"}
          </h6>
          </div>
            <button 
              className="flex items-center gap-2 px-4 py-2 text-sm hover:cursor-pointer font-semibold text-red-600 bg-red-50 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 group"
              onClick={() => openPdf(q.id)} // Sostituisci con la tua funzione download
              >
                <img 
                  src="/pdf.svg" 
                  alt="PDF" 
                  className="w-6 h-6 transition-transform group-hover:scale-110" 
                />
                <span>Apri</span>
            </button>
          </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 p-10">
              Nessun preventivo trovato.
            </div>
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
              <label className="font-medium mb-2" htmlFor="email">
                Inserisci la tua mail
              </label>
              {/* Aggiunto type="button" per evitare che invii il form */}
              <button
                type="button"
                className="text-red-700 hover:cursor-pointer hover:text-red-400 hover:scale-110"
                onClick={() => setIsClicked((prev) => !prev)}
              >
                <CircleX/>
              </button>
            </div>
            <div className="text-center p-3">
              <input
                // CORRETTO QUI: Rimossa la doppia dicitura className="className={...}"
                className="w-full my-3 p-4 py-3 border rounded-lg focus:ring-primary focus:border-primary transition duration-150"
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
