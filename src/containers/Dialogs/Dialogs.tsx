import { memo } from "react";

import { DialogCreateChannel } from "@/components/Dialog/DialogCreateChannel";
import { DialogCreateInvite } from "@/components/Dialog/DialogCreateInvite";
import DialogWrapper from "@/components/Dialog/DialogWrapper";
import { useAppDispatch, useAppSelector } from "@/store";
import { storeSelector } from "@/store/storeSelector";
import type { ActiveModalType } from "@/store/storeSlice";
import { setActiveDialog } from "@/store/storeSlice";

import guildsSelector from "../GuildsList/guildsSelector";

const { getActiveGuild } = guildsSelector;
const { getActiveDialog } = storeSelector;

const Dialogs: React.FC<{
      onClose: () => void;
      dialog: ActiveModalType | undefined;
}> = memo(({ onClose, dialog }) => {
      const activeGuild = useAppSelector(getActiveGuild);
      if (!dialog) return <></>;
      const { type, data } = dialog;
      switch (type) {
            case "add-channel":
                  return (
                        <DialogCreateChannel
                              parentId={data.parentId}
                              guildId={String(activeGuild?.id)}
                              onClose={onClose}
                        />
                  );
            case "invite-people":
                  if (!activeGuild) return <></>;
                  return (
                        <DialogCreateInvite
                              guild={activeGuild}
                              onClose={onClose}
                        />
                  );

            default:
                  return <></>;
      }
});

const DialogContainer = () => {
      const dialog = useAppSelector(getActiveDialog);
      const dispatch = useAppDispatch();
      function handleCloseDialog() {
            dispatch(setActiveDialog(undefined));
      }
      return (
            <>
                  <DialogWrapper
                        active={Boolean(dialog?.type)}
                        onClose={handleCloseDialog}
                  >
                        <Dialogs onClose={handleCloseDialog} dialog={dialog} />
                  </DialogWrapper>
            </>
      );
};

export default DialogContainer;
