import styled from "styled-components";
import { AVATAR_URI } from "@/constants";
import guildsSelector from "@/containers/GuildsList/guildsSelector";
import { useAppSelector } from "@/store";
import { storeSelector } from "@/store/storeSelector";
import ChannelsList from "../../components/ChannelsList/ChannelsList";
import Header from "../../components/Header/Header";
import Typography from "../../components/Typography/Typography";

const SidebarWrapper = styled("div")`
  width: 100%;
  height: 100%;
  background-color: var(--sidebar-primary);

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
const { getProfile } = storeSelector;
export default function Sidebar() {
  const profile = useAppSelector(getProfile);
  const activeGuild = useAppSelector(getActiveGuild);
  return (
    <>
      <SidebarWrapper>
        <Header type="sidebar" padding="14px 16px">
          <Typography fontWeight={700}>
            {activeGuild?.name ?? "Select"}
          </Typography>
        </Header>
        <List>
          <ChannelsList />
        </List>
        <Header
          sx={{
            borderTop: "1px solid var(--divider-primary)",
            borderBottom: "none",
            backgroundColor:
              "var(--bg-overlay-1,var(--background-secondary-alt))",
          }}
          type="body"
          padding="14px 16px"
        >
          <Avatar src={`${AVATAR_URI}48/${profile?.avatar}.webp`} />
          <Typography fontWeight={700}>{profile?.username}</Typography>
        </Header>
      </SidebarWrapper>
    </>
  );
}
