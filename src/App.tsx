import { useCallback, useEffect, useState } from "react";
import socket from "./socketEventListener";
import InputForm from "./components/Input";
import MessagesWrapper from "./components/MessagesWrapper";
import ChatsList from "./components/ChatsList/ChatsList";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchProfile } from "./mainStore";
import { addMessageStore } from "./components/messagesStorage";
import { IMessage } from "./interfaces";

function App() {
  const dispatch = useAppDispatch();
  const login = useAppSelector((store) => store.store.profile?.login);
  const addMessage = useCallback(
    (message: IMessage) => {
      return dispatch(
        addMessageStore({
          ...message,
          fromMe: login === message?.user_id,
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
