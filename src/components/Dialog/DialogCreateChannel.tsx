import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { InputConstructor } from "@/containers/Authorization/components/DialogLogin";
import { createChannelAction } from "@/containers/Sidebar/ChannelsList/channelActions";
import { CHANNEL_TYPES_LIST } from "@/containers/Sidebar/ChannelsList/channels.interface";
import HashIcon from "@/icons/HashtagIcon";
import RadioIcon from "@/icons/RadioIcon";
import VolumeIcon from "@/icons/VolumeIcon";
import { useAppDispatch } from "@/store";
import { setActiveDialog } from "@/store/storeSlice";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import { DialogContent, DialogFooter, DialogHeader } from "./Dialog";
import { Dialog } from "./DialogWrapper";
import type { ChangeEventHandler } from "react";

const Header = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 0;
`;

const ChannelTypeItem = styled.div<{
  $active: boolean;
}>`
  cursor: pointer;

  background-color: ${(props) =>
    props.$active
      ? "var(--background-modifier-selected)"
      : "var(--background-secondary)"};
  border-radius: 4px;
  margin-bottom: 8px;
  display: grid;
  padding: 10px 12px;

  grid-gap: 8px;
  align-items: center;
  grid-template-columns: min-content 1fr min-content;
  :hover {
    background-color: ${(props) =>
      props.$active
        ? "var(--background-modifier-selected)"
        : "var(--background-modifier-hover)"};
  }
`;
const IconWrapper = styled.div`
  display: grid;

  align-items: center;
  justify-self: center;
  height: 100%;
`;
const channelTypesList = [
  {
    id: CHANNEL_TYPES_LIST.GUILD_TEXT,
    name: "channels:type.text",
    description: "channels:type.text.description",
    icon: HashIcon,
  },
  {
    id: CHANNEL_TYPES_LIST.GUILD_VOICE,
    name: "channels:type.voice",
    description: "channels:type.voice.description",
    icon: VolumeIcon,
  },
];
export function DialogCreateChannel(props: {
  onClose: () => void;
  parentId: string;
  guildId: string;
}) {
  const { onClose, parentId, guildId } = props;
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [type, setType] = useState<CHANNEL_TYPES_LIST>(
    CHANNEL_TYPES_LIST.GUILD_TEXT
  );
  const values = useRef({
    name: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const regex = /[^a-z0-9_-]/g;
    const result = value.replace(/\s+/g, "-").replace(regex, "");

    values.current.name = result;
    e.target.value = result;
  };

  async function handleSubmit() {
    const item = {
      name: values.current.name,
      channel_type: type,
      parent_id: parentId,
      guild_id: guildId,
    };
    await dispatch(createChannelAction(item));
    dispatch(setActiveDialog({ type: undefined }));
  }
  return (
    <>
      <Dialog
        sx={{
          backgroundColor: "var(--primary-600)",
          borderRadius: "16px",
        }}
      >
        <DialogHeader>
          <Header>
            <Typography
              sx={{
                color: "var(--header-primary)",
                mb: 1,
              }}
              asBlock
              fontSize="20px"
              fontWeight={500}
            >
              {t("dialog.create_channel_header")}
            </Typography>
            <Typography
              sx={{
                color: "var(--header-secondary);",
                mb: 1,
              }}
              asBlock
              fontSize="12px"
              fontWeight={500}
            >
              {t("dialog.create_channel_subtitle", {
                name: "text channel",
              })}
            </Typography>
          </Header>
        </DialogHeader>

        <DialogContent>
          {channelTypesList.map((v) => (
            <ChannelTypeItem
              onClick={() => setType(v.id)}
              $active={type === v.id}
              key={v.id}
            >
              <IconWrapper>
                <v.icon />
              </IconWrapper>
              <div>
                <Typography
                  sx={{
                    color: "var(--header-secondary);",
                    mb: 1,
                  }}
                  asBlock
                  fontSize="12px"
                  fontWeight={500}
                >
                  {t(v.name)}
                </Typography>{" "}
                <Typography
                  sx={{
                    color: "var(--header-secondary);",
                    mb: 1,
                  }}
                  asBlock
                  fontSize="12px"
                  fontWeight={500}
                >
                  {t(v.description)}
                </Typography>
              </div>
              <RadioIcon active={type === v.id} />
            </ChannelTypeItem>
          ))}

          <InputConstructor
            text={t("channels:channel_name")}
            name={"name"}
            type={"text"}
            defaultValue={values.current.name}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogFooter>
          <Button onClick={handleSubmit}>{t("button.create")}</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
