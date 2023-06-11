import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import type { ChannelType } from "@/components/ChannelsList/channels.interface";
import API from "../api";
import type { GuildType } from "./guild";

export const fetchGuildsList = createAsyncThunk<
  (GuildType & { channels: ChannelType[] })[],
  undefined
>("guildsStorage/fetchGuilds", async () => {
  const guilds = await new API().guilds().getMyGuilds();
  return guilds.response;
});

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
