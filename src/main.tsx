import "./index.css";
import "./styles/root.css";
import "./themes/dark-theme.css";
import "./themes/light-theme.css";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";
import i18n from "./i18n/i18n.ts";
import store from "./store/index.ts";

i18n.on("languageChanged", (lng) => {
      dayjs.locale(lng);
});

dayjs.extend(isToday);
dayjs.extend(isYesterday);

// Disable Context Menus in deploy
if (import.meta.env.MODE !== "development") {
      document.addEventListener("contextmenu", (e) => {
            e.preventDefault();
      });
}

// Set color scheme
if (
      "matchMedia" in window &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
) {
      document.documentElement.classList.add("theme-dark");
} else {
      document.documentElement.classList.add("theme-light");
}

const element = document.getElementById("root") as HTMLElement;
const root = createRoot(element);
root.render(
      <Provider store={store}>
            <App />
      </Provider>
);
