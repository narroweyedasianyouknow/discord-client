import "./index.css";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import setupStore from "./store.ts";

import "./i18n.ts";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
const store = setupStore();

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
