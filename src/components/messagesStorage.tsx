import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../interfaces";

const initialState: Record<string, IMessage[]> = {};
export const messagesStorage = createSlice({
  name: "messagesStorage",
  initialState: initialState,
  reducers: {
    addMessageStore: (store, action: PayloadAction<IMessage>) => {
      const payload = action.payload;
      if (!(payload.subject_id in store)) store[payload.subject_id] = [];
      store[payload.subject_id].push(payload);
    },
  },
});

export const { addMessageStore } = messagesStorage.actions;
const messageReducer = messagesStorage.reducer;

export default messageReducer;
