import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import API from "../api";
import { IProfile } from "../interfaces";
import { IChat } from "../components/ChatsList/chat";
const chatsEntity = createEntityAdapter<IChat>();

export const fetchProfile = createAsyncThunk<
  IProfile & {
    chats: IChat[];
  }
>("mainStore/fetchProfile", async () => {
  return await new API().profile().get();
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
  profile?: IProfile;
  activeChat?: string;
  chats: EntityState<IChat>;
} = {
  profile: undefined,
  activeChat: undefined,
  chats: chatsEntity.getInitialState(),
};
export const mainStore = createSlice({
  name: "mainStore",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<string | undefined>) => {
      state.activeChat = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        const { chats, ...profile } = action.payload;

        state.profile = profile;
        chatsEntity.addMany(state.chats, chats);
      })
      .addCase(createChatAction.fulfilled, (state, action) => {
        if (action.payload.response) {
          chatsEntity.addOne(state.chats, action.payload.response);
        }
      }),
});

const mainStoreReducer = mainStore.reducer;
export const { setActiveChat } = mainStore.actions;
export default mainStoreReducer;
