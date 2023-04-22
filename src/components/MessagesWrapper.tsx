import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Message } from "../store/messages";
import MessageItem from "./MessageItem/MessageItem";

const MessageWrapper: FC<{
    messages: Message[];
}> = (props) => {
    const { messages } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [state, setState] = useState(0);

    useEffect(() => {
        const element = ref.current;
        const listener = () => {
            if (element) {
                setState(
                    element.scrollTop /
                        (element.scrollHeight - element.clientHeight)
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
                    <MessageItem key={`${message?.message}${i}`} {...message} />
                ))}
            </div>
        </>
    );
};

export default MessageWrapper;
