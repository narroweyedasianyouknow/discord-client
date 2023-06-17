import Avatar from "boring-avatars";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ATTACHMENTS_URI } from "@/constants";
import Typography from "../Typography/Typography";
import type { MessagesType } from "@containers/ChatBody/MessagesWrapper/messages.interface";
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
  flex-direction: column;
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
const AttachmentsWrapper = styled.div`
  display: flex;
`;
const ImageAttachment = styled.img.withConfig({
  shouldForwardProp: (prop) => {
    return !["dimensions"].includes(prop);
  },
})<{
  dimensions?: {
    width: number | "auto";
    height: number | "auto";
  };
}>`
  display: block;
  object-fit: cover;
  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  ${(props) => props.dimensions}
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
function getResizeOption(dimensions: { width: number; height: number }) {
  const { height, width } = dimensions;
  const maxWidth = 550,
    maxHeight = 350;
  const resizeOptions: {
    width: number | "auto";
    height: number | "auto";
  } = {
    width: "auto",
    height: "auto",
  };

  // CHECK IF WE HAVE DIMENSIONS
  if (height && width) {
    // RESIZE BY HEIGHT
    if (height > width) {
      resizeOptions.height = height > maxHeight ? maxHeight : height;
    }
    // RESIZE BY WIDTH
    else {
      resizeOptions.width = width > maxWidth ? maxWidth : width;
    }
  } else {
    resizeOptions.width = maxHeight;
  }
  return resizeOptions;
}
const MessageItem: FC<MessagesType> = (props) => {
  const { content, author, nonce, attachments } = props;

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
            <AttachmentsWrapper>
              {attachments.map((v) => {
                return (
                  <a
                    target="_blank"
                    key={v.filename}
                    href={`${ATTACHMENTS_URI}${v.filename}`}
                  >
                    <ImageAttachment
                      dimensions={getResizeOption({
                        height: v.height ?? 0,
                        width: v.width ?? 0,
                      })}
                      // onLoad={(v) => {
                      //   const element = v.target as HTMLImageElement;
                      //   element.style.height = "auto";
                      //   element.style.width = "auto";
                      // }}
                      loading="lazy"
                      src={`${ATTACHMENTS_URI}${v.filename}?maxSize=550x350`}
                    />
                  </a>
                );
              })}
            </AttachmentsWrapper>
          </MessageContent>
        </MessageWrapper>
      </MessageContainer>
    </>
  );
};

export default MessageItem;
