import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import API from "../api";
import {
  CHANNEL_TYPES_LIST,
  type ChannelType,
} from "./ChannelsList/channels.interface";
import type { MessagesType } from "./messages.interface";
import type { PayloadAction } from "@reduxjs/toolkit";

const fetchedList = new Set<string>();

export const fetchMessagesList = createAsyncThunk<MessagesType[], string>(
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
      const time = new Date(+timestamp).toDateString();
      if (!(channel_id in store))
        store[channel_id] = {
          [time]: [],
        };
      if (!(time in store[channel_id])) store[channel_id][time] = [];
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
          const time = new Date(+timestamp).toDateString();
          if (!(channel_id in store))
            store[channel_id] = {
              [time]: [],
            };
          if (!(time in store[channel_id])) store[channel_id][time] = [];
          store[channel_id][time].push(message);
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
