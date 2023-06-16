import Avatar from "boring-avatars";
import React from "react";
import styled, { keyframes } from "styled-components";
import { AVATAR_URI } from "@/constants";
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
    animation: ${switchGuildAnim} 0.2s ease-in-out 1;
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
const UploadedAvatar = styled.img<{ $active: boolean }>`
  height: 48px;
  transition: border-radius 0.2s ease-in-out;
  border-radius: ${(props) => (props.$active ? "16px" : "50%")};
  overflow: hidden;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  position: relative;
  object-fit: cover;
  aspect-ratio: 1/1;
`;
const { getGuild } = guildsSelector;
type GuildItemType = {
  id: EntityId;
  onClick: any;
  active: boolean;
};
function GuildItem(props: GuildItemType) {
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
        {item?.icon ? (
          <UploadedAvatar
            $active={active}
            src={`${AVATAR_URI}/${item?.icon}`}
          />
        ) : (
          <Avatar size={48} variant="beam" name={item?.name} />
        )}
      </GuildWrapper>
    </>
  );
}
export default GuildItem;
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
