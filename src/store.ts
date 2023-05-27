import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import messageReducer from "./components/messagesStorage";
import mainStoreReducer from "./store/storeSlice";
import type { TypedUseSelectorHook} from "react-redux";
const reducer = combineReducers({
  messages: messageReducer,
  store: mainStoreReducer,
});
const setupStore = () => {
  return configureStore({
    reducer: reducer,
    devTools: {
      name: "hell",
    },
  });
};

export type RootState = ReturnType<typeof reducer>;
export type Store = ReturnType<typeof setupStore>;
export type StoreDispatch = Store["dispatch"];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<StoreDispatch>();

export default setupStore;
