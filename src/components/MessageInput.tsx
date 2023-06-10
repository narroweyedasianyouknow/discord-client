import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import API from "@/api";
import AddFilledIcon from "../icons/AddFilledIcon";
import { useAppSelector } from "../store";
import { storeSelector } from "../store/storeSelector";

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
  &::placeholder {
    color: var(--header-light);
    user-select: none;
  }
`;
const InputWrapper = styled.div`
  height: 44px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.div`
  height: 44px;
  width: 44px;
  background-color: var(--bg-second);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1px;
`;
const { getActiveChannel } = storeSelector;
const MessageInput = () => {
  const { t } = useTranslation();
  const channel = useAppSelector(getActiveChannel);
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
    if (value.length > 0 && channel) {
      new API().message().addMessage({
        channel_id: channel.id,
        content: value,
        timestamp: 0,
        tts: false,
        mention_everyone: false,
        mentions: [],
        mention_roles: [],
        attachments: [],
        pinned: false,
        type: 0,
      });
      setValue("");
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Button>
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

export default MessageInput;
