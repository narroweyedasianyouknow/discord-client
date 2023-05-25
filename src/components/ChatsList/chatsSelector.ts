import { EntityId, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const chatsSelector = {
  getChatsIds: createSelector(
    [(store: RootState) => store.store.chats.ids],
    (ids) => ids
  ),
  getChatById: createSelector(
    [(store: RootState, id: EntityId) => store.store.chats.entities[id]],
    (chat) => chat
  ),
};
