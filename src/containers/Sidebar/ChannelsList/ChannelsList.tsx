import { useAppDispatch, useAppSelector } from "@store";
import React, { memo, useMemo, useState } from "react";
import styled from "styled-components";

import Accordion from "@/components/Accordion/Accordion";
import { setActiveDialog } from "@/store/storeSlice";

import ChannelListItem from "./ChannelListItem/ChannelListItem";
import { channelsSelector } from "./channelsSelector";

const { getChannelsIds, getActiveId, getChannelById } = channelsSelector;

const ChannelListWrapper = styled.div`
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      background: transparent;
      overflow: hidden scroll;
      padding: 5px 10px;
      padding-right: 0px;
`;

const ChannelsList = memo(() => {
      const entities = useAppSelector(getChannelsIds);

      return (
            <ChannelListWrapper className="scrollbar">
                  {Object.entries(entities).map(([category, ids]) => (
                        <CategoryChannelsList
                              key={category}
                              category={category}
                              ids={ids}
                        />
                  ))}
            </ChannelListWrapper>
      );
});
type CategoryChannelsListType = { category: string; ids: string[] };
const CategoryChannelsList = memo((props: CategoryChannelsListType) => {
      const { category, ids } = props;
      const [isOpen, setIsOpen] = useState(true);
      const active = useAppSelector(getActiveId);
      const dispatch = useAppDispatch();
      const channel = useAppSelector((s) => getChannelById(s, category));
      const hasActiveChannel = useMemo(() => {
            if (!active) return false;
            return ids.includes(active);
      }, [active, ids]);
      const activeChannel =
            hasActiveChannel && active ? (
                  <ChannelListItem active={active} key={active} id={active} />
            ) : undefined;
      const content = useMemo(() => {
            return ids.map((channel) => (
                  <ChannelListItem active={active} key={channel} id={channel} />
            ));
      }, [active, ids]);
      if (category === "0") {
            return <>{content}</>;
      }
      const handleAddChannel: React.MouseEventHandler<SVGSVGElement> = (e) =>  {
            e.stopPropagation()
            dispatch(
                  setActiveDialog({
                        type: "add-channel",
                        data: {
                              parentId: category,
                        },
                  })
            );
      }
      return (
            <Accordion
                  opened={isOpen}
                  contentOnClosed={activeChannel}
                  onChange={(val) => setIsOpen(val)}
                  content={content}
                  onPlusClick={handleAddChannel}
                  title={String(channel?.name)}
            />
      );
});
export default ChannelsList;
