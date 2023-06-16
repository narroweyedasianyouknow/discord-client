import { useAppDispatch, useAppSelector } from "@store";
import React, { useCallback } from "react";
import styled from "styled-components";
import Typography from "@/components/Typography/Typography";
import { fetchMessagesList } from "@/containers/ChatBody/MessagesWrapper/messagesActions";
import AddIcon from "@/icons/AddIcon";
import ChevronIcon from "@/icons/ChevronIcon";
import HashtagIcon from "@/icons/HashtagIcon";
import { setActiveChannel } from "@/store/storeSlice";
import { CHANNEL_TYPES_LIST } from "../channels.interface";
import { channelsSelector } from "../channelsSelector";

const ListItemWrapper = styled.div<{ $active: boolean }>`
  display: flex;

  height: fit-content;
  padding: 5px 10px;
  background-color: ${(props) =>
    props.$active ? "var(--bg-active)" : "transparent"};
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  user-select: none;
  align-items: center;
  gap: 10px;
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
    color: var(--header-light);
  }
`;

const { getChannelById } = channelsSelector;
const ChannelListItem = (props: { id: string; active?: string }) => {
  const { id, active } = props;
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
            color={"--header-light"}
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
          <AddIcon />
        </ChannelItem>
      );

    default:
      return (
        <React.Fragment>
          <ListItemWrapper
            $active={active === channel?.id}
            onClick={handleSelectChat}
          >
            <HashtagIcon width={24} height={24} />
            <Typography
              color={active !== channel?.id ? "--header-light" : undefined}
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
