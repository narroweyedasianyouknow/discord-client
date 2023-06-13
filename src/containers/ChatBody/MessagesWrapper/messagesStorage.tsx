import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import type { ChannelType } from "@/components/ChannelsList/channels.interface";
import { fetchMessagesList } from "./messagesActions";
import type { MessagesType } from "./messages.interface";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Record<
  ChannelType["id"],
  Record<string, MessagesType[]>
> = {};
export const messagesStorage = createSlice({
  name: "messagesStorage",
  initialState: initialState,
  reducers: {
    addMessageStore: (store, action: PayloadAction<MessagesType>) => {
      const payload = action.payload;
      const { channel_id, timestamp } = payload;
      const time = dayjs(+timestamp).format("YYYY-MM-DD");
      if (!(channel_id in store))
        store[channel_id] = {
          [time]: [],
        };
      if (!(time in store[channel_id])) {
        store[channel_id] = Object.assign({ [time]: [] }, store[channel_id]);
      }
      store[channel_id][time].push(payload);
      // if (payload.fromMe) dispatchCustomEvent("scroll-to-bottom");
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchMessagesList.fulfilled, (store, action) => {
      if (action.payload && action.payload?.length > 0) {
        const messages = action.payload;
        for (const message of messages) {
          const { channel_id, timestamp } = message;
          const time = dayjs(+timestamp).format("YYYY-MM-DD");

          if (!(channel_id in store))
            store[channel_id] = {
              [time]: [],
            };
          if (!(time in store[channel_id])) {
            store[channel_id][time] = [];
          }
          store[channel_id][time].unshift(message);
        }

        // dispatchCustomEvent("scroll-to-bottom", {
        //   behavior: "auto",
        // });
      }
    }),
  // .addCase(createChatAction.fulfilled, (state, action) => {
  //   if (action.payload?.response?.id)
  //     state[action.payload.response.id] = [];
  // }),
});

export const { addMessageStore } = messagesStorage.actions;
const messageReducer = messagesStorage.reducer;

export default messageReducer;
