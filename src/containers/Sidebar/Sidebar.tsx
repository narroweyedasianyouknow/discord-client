import Header from "@components/Header/Header";
import Typography from "@components/Typography/Typography";
import BoringAvatar from "boring-avatars";
import { useState } from "react";
import styled from "styled-components";

import API from "@/api";
import { DialogCreateChannel } from "@/components/Dialog/DialogCreateChannel";
import DialogWrapper from "@/components/Dialog/DialogWrapper";
import type { IGroupItem } from "@/components/GroupItems/GroupItem";
import GroupItemsList from "@/components/GroupItems/GroupItemsList";
import Popup from "@/components/Popup/Popup";
import { AVATAR_URI } from "@/constants";
import guildsSelector from "@/containers/GuildsList/guildsSelector";
import AddFilledIcon from "@/icons/AddFilledIcon";
import AddPeople from "@/icons/AddPeople";
import CategoryAddIcon from "@/icons/CategoryAddIcon";
import ChevronDownIcon from "@/icons/ChevronDownIcon";
import CrossIcon from "@/icons/CrossIcon";
import LeaveIcon from "@/icons/LeaveIcon";
import NotificationIcon from "@/icons/NotificationIcon";
import Settings from "@/icons/Settings";
import { useAppDispatch, useAppSelector } from "@/store";
import { storeSelector } from "@/store/storeSelector";
import { setActiveDialog } from "@/store/storeSlice";

import ChannelsList from "./ChannelsList/ChannelsList";

import type { MouseEventHandler } from "react";

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
      const popupItems: IGroupItem[] = [
            {
                  key: 1,
                  title: "Invite People",
                  icon: <AddPeople />,
                  onClick() {
                        if (activeGuild) {
                              API.invites()
                                    .createInvite({
                                          guild_id: activeGuild.id,
                                    })
                                    .then((res) => {
                                          console.log(res);
                                    });
                        }
                  },
            },
            {
                  key: 2,
                  title: "Server Settings",
                  icon: <Settings />,
            },
            {
                  key: 3,
                  title: "Create Channel",
                  icon: <AddFilledIcon />,
            },
            {
                  key: 4,
                  title: "Create Category",
                  icon: <CategoryAddIcon />,
            },
            {
                  key: 5,
                  title: "Notification Settings",
                  icon: <NotificationIcon />,
            },
            {
                  key: 6,
                  title: "Leave Server",
                  color: "red",
                  icon: <LeaveIcon />,
            },
      ];
      const dispatch = useAppDispatch();
      const profile = useAppSelector(getProfile);
      const activeGuild = useAppSelector(getActiveGuild);
      const activeDialog = useAppSelector(getActiveDialog);
      const [popupTarget, setPopupTarget] = useState<HTMLDivElement | null>(
            null
      );
      function handleCloseDialog() {
            dispatch(
                  setActiveDialog({
                        type: undefined,
                  })
            );
      }
      const handleClickHeader: MouseEventHandler<HTMLDivElement> = (e) => {
            const element = e.currentTarget as HTMLDivElement;
            setPopupTarget((prev) => (prev ? null : element));
      };
      function handleClosePopup() {
            setPopupTarget(null);
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
                        <Header
                              onClick={handleClickHeader}
                              sx={{
                                    cursor: "pointer",
                                    justifyContent: "space-between",
                                    backgroundColor: popupTarget
                                          ? "var(--background-modifier-hover)"
                                          : undefined,
                              }}
                              type="sidebar"
                              padding="14px 16px"
                        >
                              <Typography fontWeight={700}>
                                    {activeGuild?.name ?? "Select"}
                              </Typography>
                              {popupTarget ? (
                                    <CrossIcon />
                              ) : (
                                    <ChevronDownIcon />
                              )}
                        </Header>
                        <Popup onClose={handleClosePopup} element={popupTarget}>
                              <GroupItemsList content={popupItems} />
                        </Popup>
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
