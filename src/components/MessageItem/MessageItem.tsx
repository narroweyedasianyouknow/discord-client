import { FC } from "react";
import styled from "styled-components";
import MessageTail from "../../icons/MessageTail";
import dayjs from "dayjs";
import "./MessageItem.scss";
import { IMessage } from "../../interfaces";
const MessageContainer = styled.div<{
  $fromMe?: boolean;
}>`
  display: flex;
  justify-content: ${(props) => (props?.$fromMe ? "flex-end" : "flex-start")};
`;
const MessageWrapper = styled.div<{
  $fromMe?: boolean;
}>`
  margin: 5px;
  background-color: ${(props) => (props?.$fromMe ? "#7e6dd1" : "#e4e4e4")};
  color: ${(props) => (props?.$fromMe ? "#ffffff" : "#000000")};
  width: fit-content;
  padding: 6px 8px 6px 10px;
  border-radius: 16px;
  font-size: 16px;
  line-height: 1.3125;
  border-bottom-left-radius: ${(props) => (props?.$fromMe ? "16px" : "0")};
  border-bottom-right-radius: ${(props) => (props?.$fromMe ? "0" : "16px")};
  position: relative;

  .message-tail {
    color: ${(props) => (props?.$fromMe ? "#7e6dd1" : "#e4e4e4")};
  }
`;
const MessageContent = styled.div`
  display: flex;
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
const TimeStamp = (props: { ts: number }) => {
  const { ts } = props;
  // const locale = new Intl.DateTimeFormat().resolvedOptions().locale;
  return (
    <div className="time">
      <div className="hidden">
        <Time>{dayjs(ts).format("HH:mm")}</Time>
      </div>
      <div className="inner">
        <Time>{dayjs(ts).format("HH:mm")}</Time>
      </div>
    </div>
  );
};
const MessageItem: FC<IMessage & {fromMe?: boolean}> = (props) => {
  const { fromMe, text_content, ts } = props;

  return (
    <>
      <MessageContainer $fromMe={fromMe}>
        <MessageWrapper $fromMe={fromMe}>
          <MessageTail
            fromMe={fromMe}
            className={`message-tail ${fromMe ? "from-me" : ""}`}
          />
          <MessageContent>
            <TextWrapper>{text_content}</TextWrapper>
            <TimeStamp ts={ts} />
          </MessageContent>
        </MessageWrapper>
      </MessageContainer>
    </>
  );
};

export default MessageItem;
