import { useCallback, useEffect } from "react";
import socket from "./socketEventListener";
import InputForm from "./components/Input";
import MessagesWrapper from "./components/MessagesWrapper";
import ChatsList from "./components/ChatsList/ChatsList";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchProfile } from "./store/storeSlice";
import { addMessageStore } from "./components/messagesStorage";
import { IMessage } from "./interfaces";
import { storeSelector } from "./store/storeSelector";

const { getProfileLogin } = storeSelector;
function App() {
  const dispatch = useAppDispatch();
  const login = useAppSelector(getProfileLogin);
  const addMessage = useCallback(
    (message: IMessage) => {
      return dispatch(
        addMessageStore({
          ...message,
          state: login === message?.user_id ? 'read' : 'unread'
        })
      );
    },
    [dispatch, login]
  );
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  useEffect(() => {
    const _socket = socket(addMessage);
    return () => {
      _socket();
    };
  }, [addMessage]);

  return (
    <>
      <div className="app">
        <ChatsList />
        <div className="chat-body">
          <MessagesWrapper />
          <InputForm />
        </div>
      </div>
    </>
  );
}

export default App;
