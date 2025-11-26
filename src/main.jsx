import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import it from "./i18n/it.json";
import en from "./i18n/en.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      it: { translation: it },
      en: { translation: en },
    },
    fallbackLng: "it",
    interpolation: { escapeValue: false },
  });

ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
