import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchGuildsList } from "./guildsActions";
import type { GuildType } from "./guild";

const guildsEntity = createEntityAdapter<GuildType>({
  selectId: (val) => val.id,
});
export const guildsStorage = createSlice({
  name: "guildsStorage",
  initialState: guildsEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchGuildsList.fulfilled, (state, action) => {
      guildsEntity.addMany(
        state,
        action.payload.map(({ channels, ...v }) => v)
      );
    }),
});

const guildsReducer = guildsStorage.reducer;

export default guildsReducer;
