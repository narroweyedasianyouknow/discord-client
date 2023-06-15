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
          "button.create": "Create",
          "register.create_account": "Создать учётную запись",
          "login.welcome_back": "C возвращением!",
          "login.we_glad_to_see_you_again": "Мы так рады видеть вас снова!",
          "login.forgot_password": "Забыли пароль?",
          "login.need_create_account": "Нужна учётная запись?",
          "login.register_label": "Зарегистрироваться",
          "register.already_have_an_account": "Уже зарегистрированы?",
          "dialog.create_server_header": "Customize your server",
          "dialog.join_server_header": "Join a Server",
          "dialog.join_server_subtitle": "Enter an invite below to join an existing server",
          "dialog.create_server_subtitle":
            "Give your new server a personality with a name and an icon. You can always change it later.",
          "dialog.input.server_name": "Server Name",
          "dialog.default_server_name": "{{users}}'s server",
          "dialog.creating_server_description": "By creating a server, you agree to FakeDiscord's",
          "dialog.link_creating_server_description": "Community Guidelines",
        },
      },
    },
  });
i18n.on("languageChanged", (lng) => {
  dayjs.locale(lng);
});
export default i18n;
