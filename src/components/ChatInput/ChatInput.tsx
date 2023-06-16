import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import API from "@/api";
import { dispatchCustomEvent } from "@/utils/events";
import { uuidv4 } from "@/utils/socketEventListener";
import AddFilledIcon from "@icons/AddFilledIcon";
import { useAppSelector } from "@store";
import { storeSelector } from "@store/storeSelector";
import InputAttachments from "./InputAttachments";

const Form = styled.form`
  max-height: 50vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 35px;
  gap: 5px;
  align-items: center;
  padding: 5px 10px;

  margin: 16px 16px 20px;
`;
const Input = styled.input`
  word-break: break-all;
  width: 100%;
  border: none;
  outline: none;
  padding: 15px;
  font-size: 16px;
  font-weight: 400;
  font-family: inherit;
  resize: none;

  background-color: var(--bg-second);
  grid-area: 2 / 2 / 3 / 3;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  &::placeholder {
    color: var(--header-light);
    user-select: none;
  }
`;
const InputWrapper = styled.div`
  height: 100%;
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

export type ExtendedFile = {
  id: string;
  file: File;
};
const ChatInput = () => {
  const { t } = useTranslation();
  const channel = useAppSelector(getActiveChannel);

  const inputRef = useRef<HTMLInputElement>(null);

  const [attachments, setAttachments] = useState<ExtendedFile[]>([]);
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const message = channel
    ? t("chat.input.message_channel", {
        channel_name: channel.name,
      })
    : "";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((value.length > 0 || attachments[0]) && channel) {
      const uploadedAttachments = attachments[0]
        ? await API.upload().uploadFiles({
            files: attachments.map((v) => v.file),
          })
        : [];
      API.message()
        .addMessage({
          channel_id: channel.id,
          nonce: +new Date(),
          content: value,
          tts: false,
          mention_everyone: false,
          mentions: [],
          mention_roles: [],
          attachments: uploadedAttachments,
          pinned: false,
          type: 0,
        })
        .then((res) => {
          dispatchCustomEvent("scroll-to-bottom", {
            top: window.innerHeight + 1000,
            behavior: "smooth",
          });
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
      const dataTransfer: ExtendedFile[] = [];
      const files = elem.files;
      if (files) {
        for (const file of files) {
          if (/^image\//.test(file.type)) {
            if (file)
              dataTransfer.push({
                file,
                id: uuidv4(),
              });
          }
        }
      }
      if (files) {
        setAttachments((prev) => prev.concat(dataTransfer));
      }
    };
    input.click();
    inputRef.current?.focus();
  };

  function handleRemove(name: string) {
    setAttachments((prev) => prev.filter((v) => v.id !== name));
  }
  function handlePaste(evt: ClipboardEvent) {
    const dataTransfer: ExtendedFile[] = [];
    if (!evt.clipboardData) return false;
    for (const file of Array.from(evt.clipboardData.items)) {
      if (/^image\//.test(file.type)) {
        const binaryFile = file.getAsFile();
        if (binaryFile)
          dataTransfer.push({
            file: binaryFile,
            id: uuidv4(),
          });
      }
    }
    setAttachments((prev) => prev.concat(dataTransfer));
    inputRef.current?.focus();
  }
  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputAttachments onRemove={handleRemove} attachments={attachments} />
          <Button onClick={handleUploadClick}>
            <AddFilledIcon />
          </Button>

          <Input
            ref={inputRef}
            placeholder={message}
            onChange={handleChange}
            value={value}
          />
        </InputWrapper>
      </Form>
    </>
  );
};

export default ChatInput;
