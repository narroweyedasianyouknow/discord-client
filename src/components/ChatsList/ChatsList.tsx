import ChatsListItem from "./ChatsListItem/ChatsListItem";
import styled from "styled-components";
import { chatsSelector } from "./chatsSelector";
import { useAppSelector } from "../../store";
import { useMemo } from "react";
import CreateChatInput from "./CreateChatInput";
import { storeSelector } from "../../store/storeSelector";

const { getChatsIds } = chatsSelector;
const ChatListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  height: 100%;
  background-color: var(--bg-body);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
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
        <CreateChatInput />
      </ChatListWrapper>
    </>
  );
};

export default ChatsList;
