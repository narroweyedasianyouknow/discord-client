import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store";

import type { EntityId } from "@reduxjs/toolkit";

const guildsSelector = {
      getIds: createSelector(
            [(store: RootState) => store.guild.ids],
            (ids) => ids
      ),
      getGuild: createSelector(
            [(store: RootState, id: EntityId) => store.guild.entities[id]],
            (entity) => entity
      ),
      getActiveGuild: createSelector(
            [
                  (store: RootState) =>
                        store.store.activeGuild
                              ? store.guild.entities[store.store.activeGuild]
                              : undefined,
            ],
            (entity) => entity
      ),
      getActiveGuildId: createSelector(
            [(store: RootState) => store.store.activeGuild],
            (entity) => entity
      ),
};
export default guildsSelector;
