import { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header/Header";
import MessageInput from "../components/MessageInput";
import MessageWrapper from "../components/MessagesWrapper";
import Typography from "../components/Typography/Typography";
import HashtagIcon from "../icons/HashtagIcon";
import { storeSelector } from "../store/storeSelector";

const ChatWrapper = styled("div")`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
`;
const HeaderInner = styled("div")`
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 0 14px;
`;
const MessagesListContainer = styled("div")`
  position: relative;
`;
const { getActiveChannel } = storeSelector;
export default function ChatBody() {
  const activeChat = useSelector(getActiveChannel);
  const headerTitle = useMemo(() => {
    if (!activeChat) return <></>;
    return (
      <HeaderInner>
        <HashtagIcon />
        <Typography fontWeight={700}>{activeChat?.name}</Typography>
      </HeaderInner>
    );
  }, [activeChat]);
  return (
    <>
      <ChatWrapper>
        <Header padding="12px 6px">{headerTitle}</Header>
        <MessagesListContainer>
          <MessageWrapper />
        </MessagesListContainer>
        <MessageInput />
      </ChatWrapper>
    </>
  );
}
