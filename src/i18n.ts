import dayjs from "dayjs";
import i18n, { use } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.MODE === "development",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          "message.format_date_one": "Today at {{time}}",
          "message.format_date_two": "Yesterday at {{time}}",
          "message.format_date_other": "{{date}} at {{time}}",
          "chat.input.message_channel": "Message #{{channel_name}}",
        },
      },
    },
  });
i18n.on("languageChanged", (lng) => {
  dayjs.locale(lng);
});
export default i18n;
