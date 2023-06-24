import { createSlice } from "@reduxjs/toolkit";
import {
  createGuildAction,
  fetchGuildsListAction,
  joinGuildAction,
} from "@/containers/GuildsList/guildsActions";
import { createChannelAction } from "./channelActions";
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
      .addCase(createChannelAction.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.guild_id) {
          if (!(payload.guild_id in state)) {
            state[payload.guild_id] = normalizeChannels([payload]);
          } else {
            state[payload.guild_id].ids.push(payload.id);
            state[payload.guild_id].entities[payload.id] = payload;
          }
        }
      })
      .addCase(joinGuildAction.fulfilled, (state, action) => {
        const { channels, ...guild } = action.payload;

        state[guild.id] = normalizeChannels(channels);
      }),
});

const channelsReducer = channelsStorage.reducer;

export default channelsReducer;
