import { EntityId, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const messagesSelector = {
  getChatsMessages: createSelector(
    [
      (store: RootState) => store.messages,
      (store: RootState) => store.store.activeChat ?? "",
    ],
    (messages, id) => (id in messages ? messages[id] : [])
  )
};
