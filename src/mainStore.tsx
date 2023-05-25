import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./api";
import { IProfile } from "./interfaces";
const initialState: {
  profile?: IProfile;
  activeChat?: string;
} = {
  profile: undefined,
  activeChat: undefined,
};

export const fetchProfile = createAsyncThunk<IProfile>(
  "mainStore/fetchProfile",
  () => {
    return new API().profile().get();
  }
);
export const mainStore = createSlice({
  name: "mainStore",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<string | undefined>) => {
      state.activeChat = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    }),
});

const mainStoreReducer = mainStore.reducer;
export const { setActiveChat } = mainStore.actions;
export default mainStoreReducer;
