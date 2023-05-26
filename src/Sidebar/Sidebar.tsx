import { styled } from "@mui/material";
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

export default function Sidebar() {
  return (
    <>
      <SidebarWrapper>
        <Header padding="14px 16px">
          <Typography fontWeight={700}>
            {/* TODO: i18n localize */}
            Messenger App
          </Typography>
        </Header>
        <List></List>
      </SidebarWrapper>
    </>
  );
}
