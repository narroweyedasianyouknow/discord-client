import { useCallback, useEffect } from "react";
import styled from "styled-components";
import ChatBody from "./ChatBody/ChatBody";
import GuildsList from "./GuildsList/GuildsList";
import Sidebar from "./Sidebar/Sidebar";
import DialogLogin from "./components/Dialog/DialogLogin";
import DialogWrapper from "./components/Dialog/DialogWrapper";
import Loader from "./components/Loader/Loader";
import { addMessageStore } from "./components/messagesStorage";
import socket from "./socketEventListener";
import { useAppDispatch, useAppSelector } from "./store";
import { storeSelector } from "./store/storeSelector";
import { fetchProfile } from "./store/storeSlice";
import type { MessagesType } from "./components/messages.interface";

const { getProfileLogin, getServiceInitStatus } = storeSelector;
// function App() {
//   const dispatch = useAppDispatch();
//   const login = useAppSelector(getProfileLogin);
//   const addMessage = useCallback(
//     (message: IMessage) => {
//       return dispatch(
//         addMessageStore({
//           ...message,
//           fromMe: login === message?.user_id,
//           state: login === message?.user_id ? "read" : "unread",
//         })
//       );
//     },
//     [dispatch, login]
//   );
//   useEffect(() => {
//     dispatch(fetchProfile());
//   }, [dispatch]);
//   useEffect(() => {
//     const _socket = socket(addMessage);
//     return () => {
//       _socket();
//     };
//   }, [addMessage]);

//   return (
//     <>
//       <div className="app">
//         <Sidebar />
//         {/* <ChatsList /> */}
//         <div className="chat-body">
//           {/* <MessagesWrapper />
//           <InputForm /> */}
//         </div>
//       </div>
//     </>
//   );
// }
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
