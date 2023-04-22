import React, { useEffect, useState } from "react";

import socket from "./socketEventListener";
import { useMessagesStore } from "./store/messages";
import InputForm from "./components/Input";
import MessageItem from "./components/MessageItem/MessageItem";
import MessagesWrapper from "./components/MessagesWrapper";
import { useProfileStore } from "./store/profile";

function App() {
    const { addMessage, store } = useMessagesStore();
    const { setProfile, profile } = useProfileStore();

    useEffect(() => {
        if (!profile) setProfile();
        if (profile) {
            const _socket = socket(addMessage, profile);
            return () => {
                _socket();
            };
        }
    }, [profile]);

    return (
        <div className="chat-body">
            <MessagesWrapper messages={store} />
            <InputForm />
        </div>
    );
}

export default App;
