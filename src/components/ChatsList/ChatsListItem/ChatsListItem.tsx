import { useCallback } from "react";
import styled from "styled-components";
import HashtagIcon from "../../../icons/HashtagIcon";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setActiveChat } from "../../../store/storeSlice";
import Typography from "../../Typography/Typography";
import { fetchMessagesList } from "../../messagesStorage";
import { chatsSelector } from "../chatsSelector";
import type { EntityId } from "@reduxjs/toolkit";

const { getChatById } = chatsSelector;
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

const ChatsListItem = (props: { id: EntityId; active?: string }) => {
  const { id, active } = props;
  const chat = useAppSelector((s) => getChatById(s, id));
  const dispatch = useAppDispatch();
  const handleSelectChat = useCallback(() => {
    dispatch(setActiveChat(`${id}`));
    dispatch(fetchMessagesList(`${id}`));
  }, [dispatch, id]);

  return (
    <>
      <ListItemWrapper $active={active === id} onClick={handleSelectChat}>
        <HashtagIcon width={24} height={24} />
        <Typography color={active !== id ? "--header-light" : undefined} fontWeight={700}>
          {chat?.title ?? ""}
        </Typography>
      </ListItemWrapper>
    </>
  );
};
export default ChatsListItem;
