import Avatar from "boring-avatars";
import styled, { keyframes } from "styled-components";
import { useAppSelector } from "@/store";
import guildsSelector from "./guildsSelector";
import type { EntityId } from "@reduxjs/toolkit";
import type { MouseEventHandler } from "react";

const switchGuildAnim = keyframes`
  from {
    background-color: transparent;
    top: 50%;
    height: 0;
  }
  to {
    top: 0;
    height: 100%;
    background-color: var(--header-primary);
  }
`;
const GuildWrapper = styled.div<{ $active: boolean }>`
  height: 48px;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  position: relative;
  &::after {
    animation: ${switchGuildAnim} .2s ease-in-out 1;
    content: "";
    display: ${(props) => (props.$active ? "block" : "none")};
    width: 4px;
    height: 100%;
    position: absolute;
    border-radius: 4px;
    top: 0;
    left: 0;
    background-color: var(--header-primary);
  }
`;
const { getGuild } = guildsSelector;
export default function GuildItem(props: {
  id: EntityId;
  onClick: (id: EntityId) => void;
  active: boolean;
}) {
  const { id, active, onClick } = props;
  const item = useAppSelector((s) => getGuild(s, id));
  return (
    <>
      <GuildWrapper
        $active={active}
        onClick={function () {
          onClick(id);
        }}
      >
        <Avatar size={48} variant="beam" name={item?.name} />
      </GuildWrapper>
    </>
  );
}
export function GuildItemButton(props: {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  const { children, onClick } = props;
  return (
    <>
      <GuildWrapper $active={false} onClick={onClick}>
        {children}
      </GuildWrapper>
    </>
  );
}
