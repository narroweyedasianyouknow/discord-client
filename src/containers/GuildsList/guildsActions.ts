import API from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ResponseGuildType } from "./guild";

export const fetchGuildsListAction = createAsyncThunk<
  ResponseGuildType[],
  undefined
>("guildsStorage/fetchGuilds", async () => {
  const guilds = await API.guilds().getMyGuilds();
  return guilds.response;
});
export const createGuildAction = createAsyncThunk<
  ResponseGuildType,
  {
    name: string;
    avatar: string;
  }
>("guildsStorage/createGuildAction", async (payload) => {
  const guilds = await API.guilds().createGuild(payload);

  return guilds.response;
});
export const joinGuildAction = createAsyncThunk<
  ResponseGuildType,
  {
    guild_id: string;
  }
>("guildsStorage/joinGuildAction", async (payload) => {
  const guilds = await API.guilds().joinToGuild(payload);

  return guilds.response;
});
