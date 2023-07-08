import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from ".";

export const storeSelector = {
      getActiveChannel: createSelector(
            [
                  function (store: RootState) {
                        const { activeChannel, activeGuild } = store.store;
                        if (!activeChannel || !activeGuild) return undefined;
                        return store.channels[activeGuild].entities[
                              activeChannel
                        ];
                  },
            ],
            (active) => active
      ),
      getActiveGuild: createSelector(
            [(store: RootState) => store.store.activeGuild],
            (active) => active
      ),
      getServiceInitStatus: createSelector(
            [(store: RootState) => store.store.initialized],
            (login) => login
      ),
      getProfileLogin: createSelector(
            [(store: RootState) => store.store.profile?.username],
            (login) => login
      ),
      getProfileId: createSelector(
            [(store: RootState) => store.store.profile?.id],
            (login) => login
      ),
      getProfile: createSelector(
            [(store: RootState) => store.store.profile],
            (login) => login
      ),
      getActiveDialog: createSelector(
            [(store: RootState) => store.store.activeModal],
            (login) => login
      ),
};
