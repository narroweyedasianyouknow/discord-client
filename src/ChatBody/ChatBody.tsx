import { styled } from "@mui/material";
import Header from "../components/Header/Header";
import Typography from "../components/Typography/Typography";
import HashtagIcon from "../icons/HashtagIcon";

const ChatWrapper = styled("div")`
  width: 100%;
  height: 100%;
`;
const HeaderInner = styled("div")`
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 0 14px;
`;
export default function ChatBody() {
  return (
    <>
      <ChatWrapper>
        <Header padding="12px 6px">
          <HeaderInner>
            <HashtagIcon />
            <Typography fontWeight={700}>
              {/* TODO: i18n localize */}
              general
            </Typography>
          </HeaderInner>
        </Header>
      </ChatWrapper>
    </>
  );
}
