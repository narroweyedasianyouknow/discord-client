import { useEffect, useRef } from "react";
import styled from "styled-components";
import { addEventListener } from "../events";
import { useAppSelector } from "../store";
import { storeSelector } from "../store/storeSelector";
import MessageItem from "./MessageItem/MessageItem";
import StickyItem from "./MessageItem/StickyItem";
import { messagesSelector } from "./messagesSelector";
import type { MessagesType } from "./messages.interface";

const { getChatsMessages } = messagesSelector;
const { getProfileLogin } = storeSelector;

const ScrollbarContainer = styled("div")`
  position: absolute;
  right: 4px;
  top: 0;
  height: 100%;
  width: 8px;
  background-color: var(--divider);
  border-radius: 8px;
  overflow: hidden;
  margin: 5px 0;
`;
const ScrollbarItem = styled("div")`
  width: 10px;
  background: var(--divider-primary);
  position: relative;
  top: 0;
  right: 0;
  will-change: height, top;
  transition: top 0.05s ease-in-out;
`;

const MessageWrapper = () => {
  const messages = useAppSelector(getChatsMessages);
  const login = useAppSelector(getProfileLogin);
  const ref = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const listener = (e: ScrollToOptions | undefined = {}) => {
    const element = ref.current;
    if (element) {
      setTimeout(() => {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
          ...e,
        });
      }, 10);
    }
  };

  useEffect(() => {
    addEventListener("scroll-to-bottom", listener);
  }, []);
  useEffect(() => {
    const element = ref.current;
    const scrollbar = scrollbarRef.current;
    const scrollListener = () => {
      if (element && scrollbar) {
        const contentHeight = element.scrollHeight,
          // heightDelta = contentHeight - element.clientHeight,
          scrollTop = Math.abs(element.scrollTop),
          scrolledPercentage =
            scrollTop / (element.scrollHeight - element.clientHeight);
        const heightDelta = element.clientHeight - contentHeight;
        const height =
          heightDelta < 0
            ? Math.round(Math.pow(element.clientHeight, 2) / contentHeight)
            : 0;
        scrollbarRef.current.style.height = `${height}px`;
        scrollbarRef.current.style.top = `${100 - scrolledPercentage * 100}%`;
        const parent = scrollbarRef.current.parentElement;
        if (parent)
          scrollbarRef.current.parentElement.style.paddingBottom = `${height}px`;
      }
    };
    element?.addEventListener("scroll", scrollListener);
    return () => {
      element?.removeEventListener("scroll", scrollListener);
    };
  }, []);
  const changeScrollbarHeight = () => {
    if (ref.current) {
      const content: HTMLElement = ref.current;
      if (content) {
        // const contentHeight = content.scrollHeight,
        //   heightDelta = content.clientHeight - contentHeight;
      }
    }
  };

  useEffect(() => {
    changeScrollbarHeight();
  }, []);
  return (
    <>
      <div className="chat-body-scroll" ref={ref}>
        {Object.entries(messages).map(([date, messages]) => (
          <section date-day={date} key={date}>
            <StickyItem ts={date} />
            {messages.map((message: JSX.IntrinsicAttributes & MessagesType) =>
              message.id === "new-message-marker" ? (
                <StickyItem />
              ) : (
                <MessageItem
                  fromMe={message.author === login}
                  key={`${message?.id}`}
                  {...message}
                />
              )
            )}
          </section>
        ))}
      </div>
      <ScrollbarContainer>
        <ScrollbarItem ref={scrollbarRef} />
      </ScrollbarContainer>
    </>
  );
};

export default MessageWrapper;
