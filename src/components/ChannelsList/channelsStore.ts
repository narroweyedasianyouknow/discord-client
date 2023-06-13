import { createSlice } from "@reduxjs/toolkit";
import { fetchGuildsList } from "@/containers/GuildsList/guildsActions";
import type { ChannelType } from "./channels.interface";

const initialState: {
  [name: string]: {
    ids: string[];
    entities: Record<string, ChannelType>;
  };
} = {};
export const channelsStorage = createSlice({
  name: "channelsStorage",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchGuildsList.fulfilled, (state, action) => {
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
      for (const { channels, id } of action.payload) {
        state[id] = normalizeChannels(channels);
      }
    }),
});

const channelsReducer = channelsStorage.reducer;

export default channelsReducer;
