import Header from "@components/Header/Header";
import Typography from "@components/Typography/Typography";
import BoringAvatar from "boring-avatars";
import styled from "styled-components";

import API from "@/api";
import { DialogCreateChannel } from "@/components/Dialog/DialogCreateChannel";
import DialogWrapper from "@/components/Dialog/DialogWrapper";
import { AVATAR_URI } from "@/constants";
import guildsSelector from "@/containers/GuildsList/guildsSelector";
import { useAppDispatch, useAppSelector } from "@/store";
import { storeSelector } from "@/store/storeSelector";
import { setActiveDialog } from "@/store/storeSlice";

import ChannelsList from "./ChannelsList/ChannelsList";

const SidebarWrapper = styled("div")`
      width: 100%;
      height: 100%;
      background: var(--background-secondary);

      display: flex;
      flex-direction: column;
`;
const List = styled("div")`
      width: 100%;
      height: 100%;

      background-color: var(--sidebar-primary);
      flex: 1;
`;
const Avatar = styled("img")`
      width: 32px;
      height: 32px;

      aspect-ratio: 1/1;

      object-fit: fill;

      border-radius: 50%;
`;

const { getActiveGuild } = guildsSelector;
const { getProfile, getActiveDialog } = storeSelector;
export default function Sidebar() {
      const dispatch = useAppDispatch();
      const profile = useAppSelector(getProfile);
      const activeGuild = useAppSelector(getActiveGuild);
      const activeDialog = useAppSelector(getActiveDialog);

      function handleCloseDialog() {
            dispatch(
                  setActiveDialog({
                        type: undefined,
                  })
            );
      }
      function handleCreateInvite() {
            if (activeGuild) {
                  API.invites()
                        .createInvite({
                              guild_id: activeGuild.id,
                        })
                        .then((res) => {
                              console.log(res);
                        });
            }
      }
      return (
            <>
                  <DialogWrapper
                        active={!!activeDialog.type}
                        onClose={handleCloseDialog}
                  >
                        <DialogCreateChannel
                              parentId={activeDialog.data?.parentId}
                              guildId={String(activeGuild?.id)}
                              onClose={handleCloseDialog}
                        />
                  </DialogWrapper>
                  <SidebarWrapper>
                        <Header type="sidebar" padding="14px 16px">
                              <Typography
                                    onClick={handleCreateInvite}
                                    fontWeight={700}
                              >
                                    {activeGuild?.name ?? "Select"}
                              </Typography>
                        </Header>
                        <List>
                              <ChannelsList />
                        </List>
                        <Header
                              sx={{
                                    borderTop:
                                          "1px solid var(--divider-primary)",
                                    borderBottom: "none",
                                    backgroundColor:
                                          "var(--bg-overlay-1,var(--background-secondary-alt))",
                                    gap: "10px",
                              }}
                              type="body"
                              padding="14px 16px"
                        >
                              {profile?.avatar ? (
                                    <Avatar
                                          src={`${AVATAR_URI}48/${profile?.avatar}.webp`}
                                    />
                              ) : (
                                    <BoringAvatar
                                          name={profile?.username}
                                          variant="beam"
                                    />
                              )}
                              <Typography fontWeight={700}>
                                    {profile?.username}
                              </Typography>
                        </Header>
                  </SidebarWrapper>
            </>
      );
}
