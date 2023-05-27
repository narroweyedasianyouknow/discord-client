import { useCallback, useEffect } from "react";
import styled from "styled-components";
import ChatBody from "./ChatBody/ChatBody";
import Sidebar from "./Sidebar/Sidebar";
import { addMessageStore } from "./components/messagesStorage";
import socket from "./socketEventListener";
import { useAppDispatch, useAppSelector } from "./store";
import { storeSelector } from "./store/storeSelector";
import { fetchProfile } from "./store/storeSlice";
import type { IMessage } from "./interfaces";

const { getProfileLogin } = storeSelector;
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
  grid-template-columns: 270px 1fr;
`;
export default function App() {
  const dispatch = useAppDispatch();
  const login = useAppSelector(getProfileLogin);
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
      <AppWrapper>
        <Sidebar />
        <ChatBody />
      </AppWrapper>
    </>
  );
}
