import React from "react";
import styled from "styled-components";

import type { ButtonHTMLAttributes } from "react";
import type { CSSObject } from "styled-components";

interface IButton {
      children: React.ReactNode;
      type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
      onSubmit?: ButtonHTMLAttributes<HTMLButtonElement>["onSubmit"];
      onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
      variant?: "primary" | "secondary";
      sx?: CSSObject;
}

const getColor = (color: IButton["variant"]) => {
      switch (color) {
            case "secondary":
                  return {
                        color: "var(--button-secondary-background)",
                        hover: "var(--button-secondary-background-hover)",
                  };

            default:
                  return {
                        color: "var(--brand-experiment)",
                        hover: "var(--brand-560)",
                  };
      }
};
const ButtonWrapper = styled("button").withConfig({
      shouldForwardProp(prop) {
            return !["sx", "variant"].includes(prop);
      },
})<{
      sx: CSSObject;
      variant: IButton["variant"];
}>`
      border: none;

      color: var(--white-500);

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
      ${({ variant }) => {
            const { color, hover } = getColor(variant);
            return {
                  backgroundColor: color,
                  ":hover": {
                        backgroundColor: hover,
                  },
            };
      }}
      ${(props) => props.sx}
`;
const InnerContent = styled("div")`
      margin: 0 auto;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      vertical-align: baseline;
`;
export default function Button(props: IButton) {
      const {
            children,
            type,
            onSubmit,
            onClick,
            sx = {},
            variant = "primary",
      } = props;
      return (
            <>
                  <ButtonWrapper
                        sx={sx}
                        type={type}
                        variant={variant}
                        onClick={onClick}
                        onSubmit={onSubmit}
                  >
                        <InnerContent>{children}</InnerContent>
                  </ButtonWrapper>
            </>
      );
}
