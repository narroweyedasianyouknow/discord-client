import { useEffect } from "react";
import styled from "styled-components";

import Loader from "./components/Loader/Loader";
import Authorization from "./containers/Authorization/Authorization";
import ChatBody from "./containers/ChatBody/ChatBody";
import Dialogs from "./containers/Dialogs/Dialogs";
import GuildsList from "./containers/GuildsList/GuildsList";
import Sidebar from "./containers/Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchProfile } from "./store/storeActions";
import { storeSelector } from "./store/storeSelector";
import { SocketConfig } from "./utils/socketEventListener";

const { getProfileId, getServiceInitStatus } = storeSelector;

const AppWrapper = styled.div`
      display: grid;
      height: 100%;
      background-color: var(--background-tertiary);
      grid-template-columns: 72px 270px 1fr;
`;
function App() {
      const dispatch = useAppDispatch();
      const user_id = useAppSelector(getProfileId);
      const { profile, guilds } = useAppSelector(getServiceInitStatus);

      useEffect(() => {
            dispatch(fetchProfile());
      }, [dispatch]);

      if (!user_id) {
            if (profile) return <Authorization />;
            return <Loader />;
      }
      return (
            <>
                  <AppWrapper>
                        <InitSocket />
                        <GuildsList />
                        <Sidebar />
                        <ChatBody />
                        <Dialogs />
                  </AppWrapper>
            </>
      );
}
const InitSocket = () => {
      useEffect(() => {
            const socket = new SocketConfig();
            socket.subscribe();
            return () => {
                  socket.close();
            };
      }, []);
      return <></>;
};

export default App;
