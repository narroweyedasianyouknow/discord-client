import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const messagesSelector = {
  getChatsMessages: createSelector(
    [
      (store: RootState) => store.messages,
      (store: RootState) => store.store.activeChannel ?? "",
    ],
    (messages, id) => (id in messages ? messages[id] : {})
  )
};
