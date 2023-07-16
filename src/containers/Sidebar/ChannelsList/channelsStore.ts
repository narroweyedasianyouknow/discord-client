import { createSlice } from "@reduxjs/toolkit";

import {
      createGuildAction,
      fetchGuildsListAction,
      joinGuildAction,
} from "@/containers/GuildsList/guildsActions";

import { createChannelAction } from "./channelActions";
import { CHANNEL_TYPES_LIST, type ChannelType } from "./channels.interface";

const initialState: {
      [guild_id: string]: {
            entities: Record<string, ChannelType>;
            categories: {
                  [category_id: string]: string[];
            };
      };
} = {};
const normalizeChannels = (channels: ChannelType[]) => {
      const returnValue: (typeof initialState)["1"] = {
            entities: {},
            categories: {},
      };
      for (const channel of channels) {
            if (channel.channel_type === CHANNEL_TYPES_LIST.GUILD_CATEGORY) {
                  returnValue.categories[channel.id] = [];
            }
            if (!returnValue.categories[channel.parent_id ?? "0"]) {
                  returnValue.categories[channel.parent_id ?? "0"] = [];
            } else {
                  returnValue.categories[channel.parent_id ?? "0"].push(
                        channel.id
                  );
            }
            returnValue.entities[channel.id] = channel;
      }
      return returnValue;
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
                                    state[payload.guild_id] = normalizeChannels(
                                          [payload]
                                    );
                              } else {
                                    if (
                                          payload.channel_type ===
                                          CHANNEL_TYPES_LIST.GUILD_CATEGORY
                                    ) {
                                          state[payload.guild_id].categories[
                                                payload.id
                                          ] = [];
                                    } else {
                                          state[payload.guild_id].categories[
                                                payload.parent_id ?? "0"
                                          ].push(payload.id);
                                    }
                                    state[payload.guild_id].entities[
                                          payload.id
                                    ] = payload;
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
