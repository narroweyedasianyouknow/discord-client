import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import API from "@/api";
import AddFilledIcon from "../../icons/AddFilledIcon";
import { useAppSelector } from "../../store";
import { storeSelector } from "../../store/storeSelector";
import InputAttachments from "./InputAttachments";
import type { AttachmentType } from "../../containers/ChatBody/MessagesWrapper/messages.interface";

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 35px;
  gap: 5px;
  align-items: center;
  padding: 5px 10px;

  margin: 16px 16px 20px;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 15px;
  font-size: 16px;
  font-weight: 400;

  background-color: var(--bg-second);
  grid-area: 2 / 2 / 3 / 3;

  &::placeholder {
    color: var(--header-light);
    user-select: none;
  }
`;
const InputWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;

  background-color: var(--bg-second);
  align-items: center;
`;
const Button = styled.div`
  height: 100%;
  width: 44px;
  background-color: var(--bg-second);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1px;
  grid-area: 2 / 1 / 3 / 2;
  cursor: pointer;
`;
const { getActiveChannel } = storeSelector;
const ChatInput = () => {
  const { t } = useTranslation();
  const channel = useAppSelector(getActiveChannel);
  const [attachments, setAttachments] = useState<AttachmentType[]>([]);
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const message = channel
    ? t("chat.input.message_channel", {
        channel_name: channel.name,
      })
    : "";
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((value.length > 0 || attachments[0]) && channel) {
      API.message().addMessage({
        channel_id: channel.id,
        nonce: +new Date(),
        content: value,
        tts: false,
        mention_everyone: false,
        mentions: [],
        mention_roles: [],
        attachments: attachments,
        pinned: false,
        type: 0,
      });
      setValue("");
      setAttachments([]);
    }
  };

  const handleUploadClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e) => {
      const elem = e.target as HTMLInputElement;
      const files = elem.files;
      if (files) {
        API.upload()
          .uploadFiles({ file: files })
          .then((res) => {
            setAttachments((prev) => prev.concat(res));
          });
      }
    };
    input.click();
  };
  function handleRemove(name: string) {
    setAttachments((prev) => prev.filter((v) => v.filename !== name));
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputAttachments onRemove={handleRemove} attachments={attachments} />
          <Button onClick={handleUploadClick}>
            <AddFilledIcon />
          </Button>
          <Input
            disabled={!channel}
            placeholder={message}
            value={value}
            onChange={handleChange}
          />
        </InputWrapper>
      </Form>
    </>
  );
};

export default ChatInput;
