import { createAsyncThunk } from "@reduxjs/toolkit";

import API from "@/api";

import type { CHANNEL_TYPES_LIST, ChannelType } from "./channels.interface";

export const createChannelAction = createAsyncThunk<
    ChannelType,
    {
        name: string;
        channel_type: CHANNEL_TYPES_LIST;
        parent_id: string;
        guild_id: string;
    }
>("channelsStorage/createChannelAction", async (payload, thunkApi) => {
    const guilds = await API.channel().createChannel(payload);
    if (typeof guilds.response === "string")
        return thunkApi.rejectWithValue(guilds.response);

    return guilds.response;
});
