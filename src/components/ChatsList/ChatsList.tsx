import ChatsListItem from "./ChatsListItem/ChatsListItem";
import styled from "styled-components";
import { chatsSelector } from "./chatsSelector";
import { useAppSelector } from "../../store";
import { useMemo } from "react";
import CreateChatInput from "./CreateChatInput";

const { getChatsIds } = chatsSelector;
const ChatListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: 100%;
  background-color: #252525;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
`;

const ChatsList = () => {
  const ids = useAppSelector(getChatsIds);
  const chat = useAppSelector((store) => store.store.activeChat);
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
