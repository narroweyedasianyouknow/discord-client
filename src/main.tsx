import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import setupStore from "./store.ts";
import { Provider } from "react-redux";
const store = setupStore();
createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
