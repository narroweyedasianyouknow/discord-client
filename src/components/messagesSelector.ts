import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const messagesSelector = {
  getChatsMessages: createSelector(
    [
      (store: RootState) => store.messages,
      (store: RootState) => store.store.activeChat ?? "",
    ],
    (messages, id) => (id in messages ? messages[id] : [])
  )
};
