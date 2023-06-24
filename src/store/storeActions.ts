import { createAsyncThunk } from "@reduxjs/toolkit";

import API from "@/api";
import type { PersonType } from "@/containers/GuildsList/guild";

export const fetchProfile = createAsyncThunk<{ response: PersonType }>(
    "mainStore/fetchProfile",
    async () => {
        return await API.profile().get();
    }
);
export const loginAction = createAsyncThunk<
    { response: PersonType },
    {
        email?: string | undefined;
        username?: string | undefined;
        password: string;
    }
>("mainStore/loginAction", async (payload) => {
    return await API.profile().login(payload);
});
export const registrationAction = createAsyncThunk<
    { response: PersonType },
    {
        email: string;
        password: string;
        username: string;
    }
>("mainStore/registrationAction", async (payload) => {
    return await API.profile().register(payload);
});
