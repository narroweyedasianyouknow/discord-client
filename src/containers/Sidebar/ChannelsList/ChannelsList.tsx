import { useAppSelector } from "@store";
import { useMemo } from "react";
import styled from "styled-components";

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

      const channels = useMemo(() => {
            return ids.map((channel) => (
                  <ChannelListItem active={active} key={channel} id={channel} />
            ));
      }, [ids, active]);
      return (
            <>
                  <ChannelListWrapper>{channels}</ChannelListWrapper>
            </>
      );
};

export default ChannelsList;
