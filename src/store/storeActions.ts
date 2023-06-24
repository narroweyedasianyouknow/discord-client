import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/api";
import type { IChat } from "@/components/ChannelsList/channels.interface";
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
export const createChatAction = createAsyncThunk<
  { response: IChat },
  {
    title: string;
  }
>("chatsStorage/create", (payload) => {
  return API.channel().createChannel(payload);
});
