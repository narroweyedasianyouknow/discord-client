import { createSlice } from "@reduxjs/toolkit";
import {
  createGuildAction,
  fetchGuildsListAction,
  joinGuildAction,
} from "@/containers/GuildsList/guildsActions";
import type { ChannelType } from "./channels.interface";

const initialState: {
  [name: string]: {
    ids: string[];
    entities: Record<string, ChannelType>;
  };
} = {};
const normalizeChannels = (channels: ChannelType[]) => {
  const returnValue: Record<string, ChannelType> = {};
  for (const channel of channels) {
    returnValue[channel.id] = channel;
  }
  return {
    entities: returnValue,
    ids: channels.map((v) => v.id),
  };
};
export const channelsStorage = createSlice({
  name: "channelsStorage",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchGuildsListAction.fulfilled, (state, action) => {
        for (const { channels, id } of action.payload) {
          state[id] = normalizeChannels(channels);
        }
      })
      .addCase(createGuildAction.fulfilled, (state, action) => {
        const { channels, ...guild } = action.payload;

        state[guild.id] = normalizeChannels(channels);
      })
      .addCase(joinGuildAction.fulfilled, (state, action) => {
        const { channels, ...guild } = action.payload;

        state[guild.id] = normalizeChannels(channels);
      }),
});

const channelsReducer = channelsStorage.reducer;

export default channelsReducer;
