import { createSlice } from "@reduxjs/toolkit";

import { setActiveGuild } from "@/containers/ChatBody/MessagesWrapper/messagesActions";
import type { PersonType } from "@/containers/GuildsList/guild";
import {
    createGuildAction,
    fetchGuildsListAction,
    joinGuildAction,
} from "@/containers/GuildsList/guildsActions";
import { createChannelAction } from "@/containers/Sidebar/ChannelsList/channelActions";
import { CHANNEL_TYPES_LIST } from "@/containers/Sidebar/ChannelsList/channels.interface";

import { fetchProfile, loginAction, registrationAction } from "./storeActions";

import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    profile?: PersonType;
    activeChannel?: string;
    activeGuild?: string;
    initialized: {
        profile: boolean;
        guilds: boolean;
    };
    activeModal: {
        type: string | undefined;
        data?: any;
    };
} = {
    profile: undefined,
    initialized: {
        profile: false,
        guilds: false,
    },
    activeChannel: undefined,
    activeGuild: undefined,
    activeModal: {
        data: undefined,
        type: undefined,
    },
};
export const mainStore = createSlice({
    name: "mainStore",
    initialState,
    reducers: {
        setActiveChannel: (
            state,
            action: PayloadAction<string | undefined>
        ) => {
            state.activeChannel = action.payload;
        },
        setActiveDialog: (
            state,
            action: PayloadAction<(typeof initialState)["activeModal"]>
        ) => {
            state.activeModal = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(setActiveGuild.fulfilled, (state, action) => {
                const { activeChannel, activeGuild } = action.payload;
                state.activeChannel = activeChannel;
                state.activeGuild = activeGuild;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.profile = action.payload.response;
                state.initialized.profile = true;
            })
            .addCase(fetchProfile.rejected, (state) => {
                state.initialized.profile = true;
            })
            .addCase(fetchGuildsListAction.fulfilled, (state) => {
                state.initialized.guilds = true;
            })
            .addCase(fetchGuildsListAction.rejected, (state) => {
                state.initialized.guilds = true;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.profile = action.payload.response;
            })
            .addCase(registrationAction.fulfilled, (state, action) => {
                state.profile = action.payload.response;
            })
            .addCase(createGuildAction.fulfilled, (state, action) => {
                const { id, channels } = action.payload;
                state.activeGuild = id;
                const textChannel = channels.find(
                    (v) => v.channel_type === CHANNEL_TYPES_LIST.GUILD_TEXT
                );
                state.activeChannel = textChannel?.id;
            })
            .addCase(joinGuildAction.fulfilled, (state, action) => {
                const { id, channels } = action.payload;
                state.activeGuild = id;
                const textChannel = channels.find(
                    (v) => v.channel_type === CHANNEL_TYPES_LIST.GUILD_TEXT
                );
                state.activeChannel = textChannel?.id;
            })
            .addCase(createChannelAction.fulfilled, (state, action) => {
                const { id } = action.payload;
                state.activeChannel = id;
            }),
});

const mainStoreReducer = mainStore.reducer;
export const { setActiveChannel, setActiveDialog } = mainStore.actions;
export default mainStoreReducer;
