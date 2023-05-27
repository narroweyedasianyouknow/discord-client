import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { EntityId} from "@reduxjs/toolkit";

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
