import { createAsyncThunk } from "@reduxjs/toolkit";

import API from "@/api";
import type { ChannelType } from "@/containers/Sidebar/ChannelsList/channels.interface";
import { CHANNEL_TYPES_LIST } from "@/containers/Sidebar/ChannelsList/channels.interface";
import type { RootState } from "@/store";

import type { MessagesType } from "./messages.interface";

const fetchedList = new Set<string>();

export const fetchMessagesList = createAsyncThunk<MessagesType[], string>(
    "messagesStorage/fetchMessages",
    async (payload) => {
        if (!payload || fetchedList.has(payload)) {
            return [];
        }
        const messages = await API.message().getMessages({
            id: payload,
        });
        fetchedList.add(payload);
        return messages.response;
    }
);

export const setActiveGuild = createAsyncThunk<
    {
        activeChannel: string;
        activeGuild: string;
    },
    string
>("mainStore/setActiveGuild", (payload, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    const channels = store.channels[payload]?.entities as Record<
        string,
        ChannelType
    >;
    const getChannel = Object.values(channels).find(
        (v) => v.channel_type === CHANNEL_TYPES_LIST.GUILD_TEXT
    );
    if (getChannel?.id) thunkApi.dispatch(fetchMessagesList(getChannel?.id));
    return {
        activeChannel: getChannel?.id as string,
        activeGuild: payload,
    };
});
