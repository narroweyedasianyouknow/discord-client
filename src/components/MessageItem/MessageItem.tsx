import Avatar from "boring-avatars";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Typography from "../Typography/Typography";
import type { MessagesType } from "../messages.interface";
import type { FC } from "react";
import "./MessageItem.scss";

const MessageContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: min-content auto;
  grid-template-rows: repeat(2, min-content);
  grid-column-gap: 10px;
  padding: 3px 15px;
  &:hover {
    background: var(--bg-chat-body);
  }
`;
const MessageWrapper = styled.div`
  width: fit-content;
  border-radius: 16px;
  font-size: 16px;
  line-height: 1.3125;
  position: relative;
  grid-area: 2 / 2 / 3 / 3;
`;
const MessageContent = styled.div`
  display: flex;
`;
const TextWrapper = styled.div`
  word-wrap: break-word;
  overflow: hidden;
  word-break: break-all;
  color: var(--text-80);
`;
const Time = styled.span`
  padding-left: 4px;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  color: var(--header-light);
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
const MessageItem: FC<MessagesType & { fromMe?: boolean }> = (props) => {
  const { content, author, nonce } = props;

  return (
    <>
      <MessageContainer>
        <div className="avatar">
          <Avatar name={author?.username} variant="beam" />
        </div>
        <MessageHeader>
          <Typography fontWeight={500} color="--text-90">
            {author?.username}
          </Typography>
          <TimeStamp ts={+nonce} />
        </MessageHeader>

        <MessageWrapper>
          <MessageContent>
            <TextWrapper>{content}</TextWrapper>
          </MessageContent>
        </MessageWrapper>
      </MessageContainer>
    </>
  );
};

export default MessageItem;
