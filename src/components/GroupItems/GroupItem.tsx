import { memo } from "react";
import styled from "styled-components";

import Typography from "../Typography/Typography";

import type { ButtonHTMLAttributes, FC } from "react";
export interface IGroupItem {
      title: string;
      key: number | string;
      icon?: React.ReactNode;
      color?: "red" | "unset";
      onClick?: ButtonHTMLAttributes<HTMLDivElement>["onClick"];
}
const Item = styled.div`
      height: 32px;
      user-select: none;
      cursor: pointer;
      min-width: 240px;
      padding: 6px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 2px 0;
      border-radius: 2px;
      :hover {
            background-color: var(--brand-experiment-560);
            span {
                  color: var(--white-500);
            }
            svg {
                  color: var(--white-500);
            }
      }
`;

const IconWrapper = styled.div<{ $color: IGroupItem["color"] }>`
      height: 18px;
      width: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 8px;
      flex: 0 0 auto;
      color: ${(props) => `var(${getColor(props.$color)})`};
`;
const getColor = (color?: string | undefined) => {
      switch (color) {
            case "red":
                  return "--status-danger";
            default:
                  return "--interactive-normal";
      }
};
export const GroupItem: FC<IGroupItem> = memo((props) => {
      const { title, icon, onClick, color = "unset" } = props;
      return (
            <Item onClick={onClick}>
                  <Typography
                        fontSize="14px"
                        fontWeight={500}
                        color={getColor(color)}
                  >
                        {title}
                  </Typography>
                  {icon ? (
                        <IconWrapper $color={color}>{icon}</IconWrapper>
                  ) : undefined}
            </Item>
      );
});
