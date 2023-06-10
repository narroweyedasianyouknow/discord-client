import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import type { PersonType } from "@/GuildsList/guild";
import { fetchGuildsList } from "@/GuildsList/guildsStorage";
import API from "../api";
import type { IChat } from "../components/ChannelsList/channels.interface";
import type { EntityState, PayloadAction } from "@reduxjs/toolkit";
const chatsEntity = createEntityAdapter<IChat>();

export const fetchProfile = createAsyncThunk<{ response: PersonType }>(
  "mainStore/fetchProfile",
  async () => {
    return await new API().profile().get();
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
  return await new API().profile().login(payload);
});
export const createChatAction = createAsyncThunk<
  { response: IChat },
  {
    title: string;
  }
>("chatsStorage/create", (payload) => {
  return new API().chats().createChat(payload);
});
const initialState: {
  profile?: PersonType;
  activeChannel?: number;
  activeGuild?: number;
  chats: EntityState<IChat>;
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
  chats: chatsEntity.getInitialState(),
};
export const mainStore = createSlice({
  name: "mainStore",
  initialState,
  reducers: {
    setActiveChannel: (state, action: PayloadAction<number | undefined>) => {
      state.activeChannel = action.payload;
    },
    setActiveGuild: (state, action: PayloadAction<number | undefined>) => {
      state.activeGuild = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
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
      })
      .addCase(createChatAction.fulfilled, (state, action) => {
        if (action.payload.response) {
          chatsEntity.addOne(state.chats, action.payload.response);
        }
      }),
});

const mainStoreReducer = mainStore.reducer;
export const { setActiveChannel, setActiveGuild } = mainStore.actions;
export default mainStoreReducer;
