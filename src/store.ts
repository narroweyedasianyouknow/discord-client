import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./components/ChatsList/chatsStore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import messageReducer from "./components/messagesStorage";
import mainStoreReducer from "./mainStore";
const reducer = combineReducers({
  chats: chatsReducer,
  messages: messageReducer,
  store: mainStoreReducer,
});
const setupStore = () => {
  return configureStore({
    reducer: reducer,
  });
};

export type RootState = ReturnType<typeof reducer>;
export type Store = ReturnType<typeof setupStore>;
export type StoreDispatch = Store["dispatch"];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<StoreDispatch>();

export default setupStore;
