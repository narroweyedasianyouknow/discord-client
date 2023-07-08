import i18n, { use } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import localeResources from "./locales";

use(LanguageDetector)
      .use(initReactI18next)
      .init({
            debug: import.meta.env.MODE === "development",
            fallbackLng: "en",
            lng: "en",

            interpolation: {
                  escapeValue: false,
            },
            resources: localeResources,
      });
export default i18n;
