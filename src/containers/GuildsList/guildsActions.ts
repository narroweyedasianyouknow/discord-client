import API from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ResponseGuildType } from "./guild";

export const fetchGuildsListAction = createAsyncThunk<
    ResponseGuildType[],
    undefined
>("guildsStorage/fetchGuilds", async (_, thunkApi) => {
    const guilds = await API.guilds().getMyGuilds();
    if (typeof guilds.response === "string")
        return thunkApi.rejectWithValue(guilds.response);

    return guilds.response;
});
export const createGuildAction = createAsyncThunk<
    ResponseGuildType,
    {
        name: string;
        avatar: string;
    }
>("guildsStorage/createGuildAction", async (payload, thunkApi) => {
    const guilds = await API.guilds().createGuild(payload);
    if (typeof guilds.response === "string")
        return thunkApi.rejectWithValue(guilds.response);

    return guilds.response;
});
export const joinGuildAction = createAsyncThunk<
    ResponseGuildType,
    {
        guild_id: string;
    }
>("guildsStorage/joinGuildAction", async (payload, thunkApi) => {
    const guilds = await API.guilds().joinToGuild(payload);
    if (typeof guilds.response === "string")
        return thunkApi.rejectWithValue(guilds.response);
    return guilds.response;
});
