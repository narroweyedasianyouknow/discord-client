import { styled } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
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
const { getActiveChat } = storeSelector;
export default function ChatBody() {
  const activeChat = useSelector(getActiveChat);
  const headerTitle = useMemo(() => {
    if (!activeChat) return <></>;
    return (
      <HeaderInner>
        <HashtagIcon />
        <Typography fontWeight={700}>{activeChat}</Typography>
      </HeaderInner>
    );
  }, [activeChat]);
  return (
    <>
      <ChatWrapper>
        <Header padding="12px 6px">{headerTitle}</Header>
        <MessageWrapper />
        <MessageInput />
      </ChatWrapper>
    </>
  );
}
