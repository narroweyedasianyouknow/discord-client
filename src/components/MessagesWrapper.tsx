import { useEffect, useMemo, useRef } from "react";
import { addEventListener } from "../events";
import { useAppSelector } from "../store";
import { storeSelector } from "../store/storeSelector";
import MessageItem from "./MessageItem/MessageItem";
import StickyItem from "./MessageItem/StickyItem";
import { messagesSelector } from "./messagesSelector";
import type { IMessage } from "../interfaces";

const { getChatsMessages } = messagesSelector;
const { getActiveChat, getProfileLogin } = storeSelector;
const MessageWrapper = () => {
  const messages = useAppSelector(getChatsMessages);
  const activeChat = useAppSelector(getActiveChat);
  const login = useAppSelector(getProfileLogin);
  const ref = useRef<HTMLDivElement>(null);

  const listener = (e?: ScrollToOptions | undefined) => {
    const element = ref.current;
    if (element) {
      setTimeout(() => {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
          ...(e ?? {}),
        });
      }, 10);
    }
  };

  useEffect(() => {
    listener({ behavior: "auto" });
  }, [activeChat]);

  useEffect(() => {
    addEventListener("scroll-to-bottom", listener);
  }, []);

  const groupedMessages = useMemo(() => {
    const groups: { [date: string]: IMessage[] } = {};
    let isNewMessage = false;

    messages.forEach((message) => {
      const messageDate = new Date(+message.ts).toDateString();
      if (message.state === "unread" && !isNewMessage) {
        groups[messageDate].push({
          id: "new-message-marker",
          ts: 0,
          subject_id: "",
          user_id: "",
          user_name: "",
          text_content: "New Message",
        });
        isNewMessage = true;
      }
      if (groups[messageDate]) {
        groups[messageDate].push(message);
      } else {
        groups[messageDate] = [message];
      }
    });

    return groups;
  }, [messages]);
  return (
    <>
      <div className="chat-body-scroll" ref={ref}>
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <section date-day={date} key={date}>
            <StickyItem ts={date} />
            {messages.map((message: JSX.IntrinsicAttributes & IMessage) =>
              message.id === "new-message-marker" ? (
                <StickyItem />
              ) : (
                <MessageItem fromMe={message.user_id === login} key={`${message?.id}`} {...message} />
              )
            )}
          </section>
        ))}
      </div>
    </>
  );
};

export default MessageWrapper;
