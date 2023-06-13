import API from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setActiveGuild } from "@/containers/ChatBody/MessagesWrapper/messagesActions";
import type { PersonType } from "@/containers/GuildsList/guild";
import { fetchGuildsList } from "@/containers/GuildsList/guildsActions";
import type { IChat } from "../components/ChannelsList/channels.interface";
import type { PayloadAction } from "@reduxjs/toolkit";

export const fetchProfile = createAsyncThunk<{ response: PersonType }>(
  "mainStore/fetchProfile",
  async () => {
    return await API.profile().get();
  }
);
export const loginAction = createAsyncThunk<
  { response: PersonType },
  {
    email?: string | undefined;
    username?: string | undefined;
    password: string;
  }
>("mainStore/loginAction", async (payload) => {
  return await API.profile().login(payload);
});
export const createChatAction = createAsyncThunk<
  { response: IChat },
  {
    title: string;
  }
>("chatsStorage/create", (payload) => {
  return API.chats().createChat(payload);
});

const initialState: {
  profile?: PersonType;
  activeChannel?: string;
  activeGuild?: string;
  initialized: {
    profile: boolean;
    guilds: boolean;
  };
} = {
  profile: undefined,
  initialized: {
    profile: false,
    guilds: false,
  },
  activeChannel: undefined,
  activeGuild: undefined,
};
export const mainStore = createSlice({
  name: "mainStore",
  initialState,
  reducers: {
    setActiveChannel: (state, action: PayloadAction<string | undefined>) => {
      state.activeChannel = action.payload;
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
      .addCase(fetchGuildsList.fulfilled, (state) => {
        state.initialized.guilds = true;
      })
      .addCase(fetchGuildsList.rejected, (state) => {
        state.initialized.guilds = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.profile = action.payload.response;
      }),
});

const mainStoreReducer = mainStore.reducer;
export const { setActiveChannel } = mainStore.actions;
export default mainStoreReducer;
