import { useCallback, useEffect } from "react";
import styled from "styled-components";
import Loader from "./components/Loader/Loader";
import Authorization from "./containers/Authorization/Authorization";
import ChatBody from "./containers/ChatBody/ChatBody";
import { addMessageStore } from "./containers/ChatBody/MessagesWrapper/messagesStorage";
import GuildsList from "./containers/GuildsList/GuildsList";
import Sidebar from "./containers/Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchProfile } from "./store/storeActions";
import { storeSelector } from "./store/storeSelector";
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
    if (profile) return <Authorization />;
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
