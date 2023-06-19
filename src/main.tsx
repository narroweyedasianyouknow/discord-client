import "./index.css";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./store/index.ts";

import "@utils/i18n.ts";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
// document.addEventListener("contextmenu", (e) => {
//   e.preventDefault()
// })
const element = document.getElementById("root") as HTMLElement;
const root = createRoot(element);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
