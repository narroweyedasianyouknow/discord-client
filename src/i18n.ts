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
          "profile.label.username": "Имя пользователя",
          "profile.label.email": "E-mail",
          "profile.label.password": "Пароль",
          "button.continue": "Продолжить",
          "button.login": "Вход",
          "register.create_account": "Создать учётную запись",
          "login.welcome_back": "C возвращением!",
          "login.we_glad_to_see_you_again": "Мы так рады видеть вас снова!",
        },
      },
    },
  });
i18n.on("languageChanged", (lng) => {
  dayjs.locale(lng);
});
export default i18n;
