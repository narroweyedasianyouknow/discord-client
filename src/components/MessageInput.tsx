import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import API from "../api";
import AddFilledIcon from "../icons/AddFilledIcon";
import { uuidv4 } from "../socketEventListener";
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
const { getActiveChat } = storeSelector;
const MessageInput = () => {
  const { t } = useTranslation();
  const chat = useAppSelector(getActiveChat);
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const message = chat
    ? (t("chat.input.message_channel", {
        channel_name: chat,
      }) as string)
    : "";
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length > 0 && chat) {
      new API().message().addMessage({
        id: uuidv4(),
        subject_id: chat,
        text_content: value,
        ts: +new Date(),
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
            disabled={!chat}
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
