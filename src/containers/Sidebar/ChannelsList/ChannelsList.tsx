import { useAppDispatch, useAppSelector } from "@store";
import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { setActiveDialog } from "@/store/storeSlice";
import ChannelListItem from "./ChannelListItem/ChannelListItem";
import { channelsSelector } from "./channelsSelector";

const { getChannelsIds, getActiveId } = channelsSelector;

const ChannelListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: transparent;
  padding: 5px 10px;
`;

const ChannelsList = () => {
  const ids = useAppSelector(getChannelsIds);
  const active = useAppSelector(getActiveId);
  const dispatch = useAppDispatch();
  const onAddChannel = useCallback(
    (parent_id: string) => {
      dispatch(
        setActiveDialog({
          data: {
            parentId: parent_id,
          },
          type: "add-channel",
        })
      );
    },
    [dispatch]
  );
  const channels = useMemo(() => {
    return ids.map((channel) => (
      <ChannelListItem
        active={active}
        onAddChannel={onAddChannel}
        key={channel}
        id={channel}
      />
    ));
  }, [ids, active, onAddChannel]);
  return (
    <>
      <ChannelListWrapper>{channels}</ChannelListWrapper>
    </>
  );
};

export default ChannelsList;
