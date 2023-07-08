import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import {
      createGuildAction,
      fetchGuildsListAction,
      joinGuildAction,
} from "./guildsActions";

import type { GuildType } from "./guild";

const guildsEntity = createEntityAdapter<GuildType>({
      selectId: (val) => val.id,
});
export const guildsStorage = createSlice({
      name: "guildsStorage",
      initialState: guildsEntity.getInitialState(),
      reducers: {},
      extraReducers: (builder) =>
            builder
                  .addCase(fetchGuildsListAction.fulfilled, (state, action) => {
                        guildsEntity.addMany(
                              state,
                              action.payload.map(({ channels, ...v }) => v)
                        );
                  })
                  .addCase(createGuildAction.fulfilled, (state, action) => {
                        const { channels, id, ...guild } = action.payload;
                        guildsEntity.addOne(state, {
                              id: String(id),
                              ...guild,
                        });
                  })
                  .addCase(joinGuildAction.fulfilled, (state, action) => {
                        const { channels, id, ...guild } = action.payload;
                        guildsEntity.addOne(state, {
                              id: String(id),
                              ...guild,
                        });
                  }),
});

const guildsReducer = guildsStorage.reducer;

export default guildsReducer;
