import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import API from "@/api";
import type { GuildType } from "@/containers/GuildsList/guild";
import type { InvitesType } from "@/interfaces";

import Button from "../Button/Button";
import Input from "../Input/Input";
import Typography from "../Typography/Typography";

import { DialogFooter, DialogHeader } from "./Dialog";
import { Dialog } from "./DialogWrapper";

export function DialogCreateInvite(props: {
      onClose: () => void;
      guild: GuildType;
}) {
      const { onClose, guild } = props;
      const { t } = useTranslation();
      const [invite, setInvite] = useState<InvitesType | null>(null);

      useEffect(() => {
            async function handleSubmit() {
                  const invite = await API.invites().createInvite({
                        guild_id: guild.id,
                  });
                  setInvite(invite);
            }
            handleSubmit();
      }, [guild.id]);
      const header = (
            <Typography
                  sx={{
                        color: "var(--header-primary)",
                        mb: 1,
                  }}
                  asBlock
                  fontSize="20px"
                  fontWeight={500}
            >
                  <Trans
                        values={{ name: guild.name }}
                        t={t}
                        i18nKey={"invite.friends_to_chat"}
                        components={[
                              <Typography fontWeight={600} key={0}>
                                    {"{{name}}"}
                              </Typography>,
                        ]}
                  />
            </Typography>
      );
      const expiresText = t("invite.invite_link_expires_in", {
            day: invite?.expires,
      });
      return (
            <Dialog
                  sx={{
                        backgroundColor: "var(--primary-600)",
                        borderRadius: "4px",
                        maxWidth: "440px",
                        width: "100%",
                  }}
            >
                  <DialogHeader>{header}</DialogHeader>
                  <DialogFooter
                        sx={{
                              flexDirection: "column",
                        }}
                  >
                        <Input
                              size="s"
                              readOnly
                              value={invite?.code}
                              rightElement={<Button>{t("button.copy")}</Button>}
                        />
                        {expiresText}
                  </DialogFooter>
            </Dialog>
      );
}
