import { useAppDispatch, useAppSelector } from "@store";
import React, { useCallback } from "react";
import styled from "styled-components";
import Typography from "@/components/Typography/Typography";
import { fetchMessagesList } from "@/containers/ChatBody/MessagesWrapper/messagesActions";
import AddIcon from "@/icons/AddIcon";
import ChevronIcon from "@/icons/ChevronIcon";
import HashIcon from "@/icons/HashtagIcon";
import { setActiveChannel } from "@/store/storeSlice";
import { CHANNEL_TYPES_LIST } from "../channels.interface";
import { channelsSelector } from "../channelsSelector";

const ListItemWrapper = styled.div<{ $active: boolean }>`
  display: flex;

  height: fit-content;
  padding: 5px 10px;
  background-color: ${(props) =>
    props.$active
      ? "var(--bg-overlay-selected,var(--background-modifier-selected))"
      : "transparent"};
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  user-select: none;
  align-items: center;
  gap: 10px;
  color: var(--channels-default);
`;
const ChannelItem = styled.div`
  display: flex;

  padding-top: 16px;

  height: fit-content;
  width: 100%;
  cursor: pointer;
  user-select: none;
  align-items: center;
  svg {
    color: var(--channels-default);
  }
`;

const { getChannelById } = channelsSelector;
const ChannelListItem = (props: {
  id: string;
  active?: string;
  onAddChannel: (parent_id: string) => void;
}) => {
  const { id, active, onAddChannel } = props;
  const channel = useAppSelector((s) => getChannelById(s, id));
  const dispatch = useAppDispatch();
  const handleSelectChat = useCallback(() => {
    dispatch(setActiveChannel(channel?.id));
    if (channel?.id) dispatch(fetchMessagesList(channel?.id));
  }, [dispatch, channel]);

  switch (channel?.channel_type) {
    case CHANNEL_TYPES_LIST.GUILD_CATEGORY:
      return (
        <ChannelItem>
          <ChevronIcon />
          <Typography
            color={"--channels-default"}
            fontSize="12px"
            fontWeight={600}
            sx={{
              letterSpacing: ".02em",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              flex: "1",
            }}
          >
            {channel?.name ?? ""}
          </Typography>
          <AddIcon onClick={() => onAddChannel(channel.id)} />
        </ChannelItem>
      );

    default:
      return (
        <React.Fragment>
          <ListItemWrapper
            $active={active === channel?.id}
            onClick={handleSelectChat}
          >
            <HashIcon width={24} height={24} />
            <Typography
              color={
                active !== channel?.id
                  ? "--channels-default"
                  : "--interactive-active"
              }
              fontWeight={700}
            >
              {channel?.name ?? ""}
            </Typography>
          </ListItemWrapper>
        </React.Fragment>
      );
  }
};
export default ChannelListItem;
