import React, { useLayoutEffect, useRef } from "react";

import MessageItem from "@/components/MessageItem/MessageItem";
import StickyItem from "@/components/MessageItem/StickyItem";
import { useAppSelector } from "@/store";
import { addEventListener } from "@/utils/events";

import { messagesSelector } from "./messagesSelector";

import type { MessagesType } from "./messages.interface";

const { getChatsMessages } = messagesSelector;

const MessageWrapper = () => {
    const messages = useAppSelector(getChatsMessages);
    const ref = useRef<HTMLDivElement>(null);
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

    useLayoutEffect(() => {
        addEventListener("scroll-to-bottom", listener);
    }, []);

    return (
        <>
            <div className="chat-body-scroll scrollbar" ref={ref}>
                <div className="chat-body-scroll-inner">
                    <div className="empty-space" />
                    {Object.entries(messages).map(([date, messages]) => (
                        <React.Fragment key={date}>
                            <StickyItem ts={date} />
                            {messages.map((message: MessagesType) => (
                                <MessagesListWrapper
                                    key={message.id}
                                    message={message}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

function MessagesListWrapper(props: { message: MessagesType }) {
    const { message } = props;
    if (message.id === "new-message-marker") {
        return <StickyItem />;
    } else return <MessageItem key={`${message?.id}`} {...message} />;
}
export default MessageWrapper;
