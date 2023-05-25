import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const storeSelector = {
  getActiveChat: createSelector(
    [(store: RootState) => store.store.activeChat],
    (active) => active
  ),
  getProfileLogin: createSelector(
    [(store: RootState) => store.store.profile?.login],
    (login) => login
  ),
};
