import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { createChannelAction } from "@/containers/Sidebar/ChannelsList/channelActions";
import type { ChannelType } from "@/containers/Sidebar/ChannelsList/channels.interface";
import { fetchMessagesList } from "./messagesActions";
import type { MessagesType } from "./messages.interface";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Record<
  ChannelType["id"],
  Record<string, MessagesType[]>
> = {};

function addMessageToStorage(
  store: typeof initialState,
  message: MessagesType,
  push?: boolean
) {
  const { channel_id, timestamp } = message;
  const time = dayjs(+timestamp).format("YYYY-MM-DD");

  if (!(channel_id in store))
    store[channel_id] = {
      [time]: [],
    };
  if (!(time in store[channel_id])) {
    store[channel_id] = Object.assign(
      {
        [time]: [],
      },
      store[channel_id]
    );
  }
  if (push) {
    store[channel_id][time].push(message);
  } else {
    store[channel_id][time].unshift(message);
  }
}
export const messagesStorage = createSlice({
  name: "messagesStorage",
  initialState: initialState,
  reducers: {
    addMessageStore: (store, action: PayloadAction<MessagesType>) => {
      const payload = action.payload;
      addMessageToStorage(store, payload, true);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMessagesList.fulfilled, (store, action) => {
        if (action.payload && action.payload?.length > 0) {
          const messages = action.payload;
          for (const message of messages) {
            addMessageToStorage(store, message);
          }
        }
      })
      .addCase(createChannelAction.fulfilled, (store, action) => {
        const payload = action.payload;
        if (payload.id) {
          store[payload.id] = {};
        }
      }),
});

export const { addMessageStore } = messagesStorage.actions;
const messageReducer = messagesStorage.reducer;

export default messageReducer;
