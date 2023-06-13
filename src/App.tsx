import { useCallback, useEffect } from "react";
import styled from "styled-components";
import DialogLogin from "./components/Dialog/DialogLogin";
import DialogWrapper from "./components/Dialog/DialogWrapper";
import Loader from "./components/Loader/Loader";
import ChatBody from "./containers/ChatBody/ChatBody";
import { addMessageStore } from "./containers/ChatBody/MessagesWrapper/messagesStorage";
import GuildsList from "./containers/GuildsList/GuildsList";
import Sidebar from "./containers/Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "./store";
import { storeSelector } from "./store/storeSelector";
import { fetchProfile } from "./store/storeSlice";
import socket from "./utils/socketEventListener";
import type { MessagesType } from "./containers/ChatBody/MessagesWrapper/messages.interface";

const { getProfileLogin, getServiceInitStatus } = storeSelector;

const AppWrapper = styled.div`
  display: grid;
  height: 100%;
  background-color: var(--bg-body);
  grid-template-columns: 72px 270px 1fr;
`;
function App() {
  const dispatch = useAppDispatch();
  const login = useAppSelector(getProfileLogin);
  const { profile, guilds } = useAppSelector(getServiceInitStatus);
  const addMessage = useCallback(
    (message: MessagesType) => dispatch(addMessageStore(message)),
    [dispatch]
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

  if (!login) {
    if (profile)
      return (
        <DialogWrapper
          bgColor="--brand-color-560"
          onClose={() => {
            //
          }}
          active={true}
        >
          <DialogLogin />
        </DialogWrapper>
      );
    return <Loader />;
  }
  return (
    <>
      <AppWrapper>
        <GuildsList />
        <Sidebar />
        <ChatBody />
      </AppWrapper>
    </>
  );
}
export default App;
