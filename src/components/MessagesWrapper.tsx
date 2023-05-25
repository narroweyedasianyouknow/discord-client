import { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem/MessageItem";
import { messagesSelector } from "./messagesSelector";
import { useAppDispatch, useAppSelector } from "../store";

const { getChatsMessages } = messagesSelector;
const MessageWrapper = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(getChatsMessages);
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(0);

  useEffect(() => {
    const element = ref.current;
    const listener = () => {
      if (element) {
        setState(
          element.scrollTop / (element.scrollHeight - element.clientHeight)
        );
      }
    };
    element?.addEventListener("scroll", listener);
    return () => {
      element?.removeEventListener("scroll", listener);
    };
  }, []);
  return (
    <>
      <div className="chat-body-scroll" ref={ref}>
        {messages.map((message, i) => (
          <MessageItem key={`${message?.id}${i}`} {...message} />
        ))}
      </div>
    </>
  );
};

export default MessageWrapper;
