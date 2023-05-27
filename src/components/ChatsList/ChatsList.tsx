import { useMemo } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store";
import { storeSelector } from "../../store/storeSelector";
import ChatsListItem from "./ChatsListItem/ChatsListItem";
import { chatsSelector } from "./chatsSelector";

const { getChatsIds } = chatsSelector;
const ChatListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: transparent;
  padding: 5px 10px;
`;

const { getActiveChat } = storeSelector;
const ChatsList = () => {
  const ids = useAppSelector(getChatsIds);
  const chat = useAppSelector(getActiveChat);
  const chats = useMemo(() => {
    return ids.map((id) => <ChatsListItem active={chat} key={id} id={id} />);
  }, [chat, ids]);
  return (
    <>
      <ChatListWrapper>
        {chats}
        {/* <CreateChatInput /> */}
      </ChatListWrapper>
    </>
  );
};

export default ChatsList;
