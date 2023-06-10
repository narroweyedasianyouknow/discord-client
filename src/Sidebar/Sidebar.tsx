import { styled } from "@mui/material";
import guildsSelector from "@/GuildsList/guildsSelector";
import { useAppSelector } from "@/store";
import ChannelsList from "../components/ChannelsList/ChannelsList";
import Header from "../components/Header/Header";
import Typography from "../components/Typography/Typography";

const SidebarWrapper = styled("div")`
  width: 100%;
  height: 100%;
  background-color: var(--sidebar-primary);
`;
const List = styled("div")`
  width: 100%;
  height: 100%;
  background-color: var(--sidebar-primary);
`;

const { getActiveGuild } = guildsSelector;
export default function Sidebar() {
  const activeGuild = useAppSelector(getActiveGuild);
  return (
    <>
      <SidebarWrapper>
        <Header type="sidebar" padding="14px 16px">
          <Typography fontWeight={700}>{activeGuild?.name ?? "Select"}</Typography>
        </Header>
        <List>
          <ChannelsList />
        </List>
      </SidebarWrapper>
    </>
  );
}
