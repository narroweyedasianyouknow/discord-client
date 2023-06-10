import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export const channelsSelector = {
  getChatsIds: createSelector(
    [
      (store: RootState) =>
        store.store.activeGuild
          ? store.channels[store.store.activeGuild].ids
          : [],
    ],
    (entity) => entity
  ),
  getActiveId: createSelector(
    [
      function (store: RootState) {
        return store.store.activeChannel
        // const { activeGuild, activeChannel } = store.store;
        // if (!activeGuild || !activeChannel) return undefined;
        // return store.channels[activeGuild].entities[activeChannel];
      },
    ],
    (entity) => entity
  ),
  getChannelById: createSelector(
    [
      (store: RootState, id: number) =>
        store.store.activeGuild
          ? store.channels[store.store.activeGuild].entities[id]
          : undefined,
    ],
    (chat) => chat
  ),
};
