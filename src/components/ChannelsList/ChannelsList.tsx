import { useMemo } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store";
import ChannelListItem from "./ChannelListItem/ChannelListItem";
import { channelsSelector } from "./channelsSelector";

const { getChatsIds, getActiveId } = channelsSelector;

const ChannelListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: transparent;
  padding: 5px 10px;
`;

const ChannelsList = () => {
  const ids = useAppSelector(getChatsIds);
  const active = useAppSelector(getActiveId);
  const chats = useMemo(() => {
    return ids.map((channel) => (
      <ChannelListItem active={active} key={channel} id={channel} />
    ));
  }, [ids, active]);
  return (
    <>
      <ChannelListWrapper>{chats}</ChannelListWrapper>
    </>
  );
};

export default ChannelsList;
