import ChatInput from "@components/ChatInput/ChatInput";
import Header from "@components/Header/Header";
import Typography from "@components/Typography/Typography";
import HashIcon from "@icons/HashtagIcon";
import { storeSelector } from "@store/storeSelector";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { dispatchCustomEvent } from "@/utils/events";
import MessageWrapper from "./MessagesWrapper/MessagesWrapper";

const ChatWrapper = styled("div")`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: min-content 9fr 1fr;
  background: var(--bg-overlay-chat, var(--background-primary));
`;
const HeaderInner = styled("div")`
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 0 14px;
`;
const MessagesListContainer = styled("div")`
  position: relative;
  ::before {
    content: "";
    position: absolute;
    display: block;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    -webkit-box-shadow: var(--elevation-low);
    box-shadow: var(--elevation-low);
    z-index: 1;
    pointer-events: none;
  }
`;
const { getActiveChannel } = storeSelector;
export default function ChatBody() {
  const activeChannel = useSelector(getActiveChannel);
  const headerTitle = useMemo(() => {
    if (!activeChannel) return <></>;
    return (
      <HeaderInner>
        <HashIcon />
        <Typography fontWeight={700}>{activeChannel?.name}</Typography>
      </HeaderInner>
    );
  }, [activeChannel]);

  useEffect(() => {
    dispatchCustomEvent("scroll-to-bottom", { behavior: "instant" });
  }, [activeChannel]);
  return (
    <>
      <ChatWrapper>
        <Header padding="12px 6px">{headerTitle}</Header>
        <MessagesListContainer>
          <MessageWrapper />
        </MessagesListContainer>
        <ChatInput />
      </ChatWrapper>
    </>
  );
}
