import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";
import { dispatchCustomEvent } from "../events";
import { createChatAction } from "../store/storeSlice";
import type { IMessage } from "../interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";

const fetchedList = new Set<string>();

export const fetchMessagesList = createAsyncThunk<IMessage[], string>(
  "messagesStorage/fetchMessages",
  async (payload) => {
    if (!payload || fetchedList.has(payload)) return [];
    const messages = await new API().message().getMessages({
      id: payload,
    });
    fetchedList.add(payload);
    return messages.response;
  }
);

const initialState: Record<string, IMessage[]> = {};
export const messagesStorage = createSlice({
  name: "messagesStorage",
  initialState: initialState,
  reducers: {
    addMessageStore: (
      store,
      action: PayloadAction<IMessage & { fromMe: boolean }>
    ) => {
      const payload = action.payload;
      if (!(payload.subject_id in store)) store[payload.subject_id] = [];
      store[payload.subject_id].push(payload);
      if (payload.fromMe) dispatchCustomEvent("scroll-to-bottom");
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMessagesList.fulfilled, (state, action) => {
        if (action.payload && action.payload?.length > 0) {
          const message = action.payload[0];
          state[message.subject_id] = action.payload;
          dispatchCustomEvent("scroll-to-bottom", {
            behavior: "auto",
          });
        }
      })
      .addCase(createChatAction.fulfilled, (state, action) => {
        if (action.payload?.response?.id)
          state[action.payload.response.id] = [];
      }),
});

export const { addMessageStore } = messagesStorage.actions;
const messageReducer = messagesStorage.reducer;

export default messageReducer;
