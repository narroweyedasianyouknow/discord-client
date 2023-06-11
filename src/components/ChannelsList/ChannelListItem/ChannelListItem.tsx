import React, { useCallback } from "react";
import styled from "styled-components";
import { fetchMessagesList } from "@/components/messagesStorage";
import HashtagIcon from "../../../icons/HashtagIcon";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setActiveChannel } from "../../../store/storeSlice";
import Typography from "../../Typography/Typography";
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
        <React.Fragment>
          <Typography color={"--header-light"} fontWeight={400}>
            {channel?.name ?? ""}
          </Typography>
        </React.Fragment>
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
