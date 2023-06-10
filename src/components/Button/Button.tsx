import { styled } from "@mui/material";
import React from "react";
import type { SxProps, Theme } from "@mui/material";
import type { ButtonHTMLAttributes } from "react";

interface IButton {
  children: React.ReactNode;
  sx?: SxProps<Theme> | undefined;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onSubmit?: ButtonHTMLAttributes<HTMLButtonElement>["onSubmit"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}
const ButtonWrapper = styled("button")`
  border: none;

  background-color: var(--brand-color);

  margin-bottom: 8px;

  display: flex;
  align-items: center;
  padding: 2px 16px;
  border-radius: 3px;
  font-weight: 500;

  cursor: pointer;
  user-select: none;

  width: 100%;
  height: 44px;
  min-width: 130px;
  min-height: 44px;

  font-size: 16px;
  line-height: 24px;

  outline: none;

  transition: background-color 0.17s ease, color 0.17s ease;
  &:hover {
    background-color: var(--brand-color-560);
  }
`;
const InnerContent = styled("div")`
  margin: 0 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: baseline;
`;
export default function Button(props: IButton) {
  const { children, sx, type, onSubmit, onClick } = props;
  return (
    <>
      <ButtonWrapper type={type} sx={sx} onClick={onClick} onSubmit={onSubmit}>
        <InnerContent>{children}</InnerContent>
      </ButtonWrapper>
    </>
  );
}
