import API from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ChannelType } from "@/components/ChannelsList/channels.interface";
import type { GuildType } from "./guild";

export const fetchGuildsList = createAsyncThunk<
  (GuildType & { channels: ChannelType[] })[],
  undefined
>("guildsStorage/fetchGuilds", async () => {
  const guilds = await API.guilds().getMyGuilds();
  return guilds.response;
});
