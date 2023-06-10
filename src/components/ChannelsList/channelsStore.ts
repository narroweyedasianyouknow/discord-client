import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchGuildsList } from "@/GuildsList/guildsStorage";
import type { ChannelType } from "./channels.interface";

const guildsEntity = createEntityAdapter<ChannelType>({
  selectId: (val) => val.id,
});
const initialState: {
  [name: number]: {
    ids: number[];
    entities: Record<number, ChannelType>;
  };
} = {};
export const channelsStorage = createSlice({
  name: "channelsStorage",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchGuildsList.fulfilled, (state, action) => {
      const normalizeChannels = (channels: ChannelType[]) => {
        const returnValue: Record<number, ChannelType> = {};
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
