import Avatar from "boring-avatars";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Typography from "../Typography/Typography";
import type { IMessage } from "../../interfaces";
import type { FC} from "react";
import "./MessageItem.scss";

const MessageContainer = styled.div<{
  $fromMe?: boolean;
}>`
  display: grid;
  width: 100%;
  grid-template-columns: min-content auto;
  grid-template-rows: repeat(2, min-content);
  grid-column-gap: 10px;
  padding: 3px 5px;
`;
const MessageWrapper = styled.div<{
  $fromMe?: boolean;
}>`
  width: fit-content;
  border-radius: 16px;
  font-size: 16px;
  line-height: 1.3125;
  border-bottom-left-radius: ${(props) => (props?.$fromMe ? "16px" : "0")};
  border-bottom-right-radius: ${(props) => (props?.$fromMe ? "0" : "16px")};
  position: relative;
  grid-area: 2 / 2 / 3 / 3;
`;
const MessageContent = styled.div`
  display: flex;
  color: var(--text-100);
`;
const TextWrapper = styled.div`
  word-wrap: break-word;
  overflow: hidden;
  word-break: break-all;
`;
const Time = styled.span`
  padding-left: 4px;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  color: #aaaaaa;
`;
const MessageHeader = styled.div`
  display: flex;
  grid-area: 1 / 2 / 2 / 3;
`;

const TimeStamp = (props: { ts: number }) => {
  const { ts } = props;
  const { t } = useTranslation();
  const day = useMemo(() => {
    return dayjs(+ts);
  }, [ts]);
  return (
    <div className="time">
      <div className="hidden">
        <Time>
          {t("message.format_date", {
            count: day.isToday() ? 1 : day.isYesterday() ? 2 : 0,
            time: day.format("HH:mm"),
            date: day.format("DD/MM/YYYY"),
          })}
        </Time>
      </div>
    </div>
  );
};
const MessageItem: FC<IMessage & { fromMe?: boolean }> = (props) => {
  const { fromMe, text_content, user_id, ts } = props;

  return (
    <>
      <MessageContainer $fromMe={fromMe}>
        <div className="avatar">
          <Avatar name={user_id} variant="beam" />
        </div>
        <MessageHeader>
          <Typography>{user_id}</Typography>
          <TimeStamp ts={ts} />
        </MessageHeader>

        <MessageWrapper $fromMe={fromMe}>
          <MessageContent>
            <TextWrapper>{text_content}</TextWrapper>
          </MessageContent>
        </MessageWrapper>
      </MessageContainer>
    </>
  );
};

export default MessageItem;
