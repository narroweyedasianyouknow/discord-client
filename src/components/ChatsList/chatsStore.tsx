import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { IChat } from "./chat";
import API from "../../api";
import { fetchProfile } from "../../mainStore";

export const createChatAction = createAsyncThunk<
  { response: IChat },
  {
    title: string;
  }
>("chatsStorage/create", (payload) => {
  return new API().chats().createChat(payload);
});

const chats = createEntityAdapter<IChat>();
export const chatsStore = createSlice({
  name: "chatsStorage",
  initialState: chats.getInitialState(),
  reducers: {
    initChats: chats.addMany,
  },
  extraReducers: (builder) =>
    builder
      .addCase(createChatAction.fulfilled, (state, action) => {
        if (action.payload.response)
          chats.addOne(state, action.payload.response);
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        if (action.payload.chats) chats.addMany(state, action.payload.chats);
      }),
});
export const { initChats } = chatsStore.actions;
const chatsReducer = chatsStore.reducer;

export default chatsReducer;
