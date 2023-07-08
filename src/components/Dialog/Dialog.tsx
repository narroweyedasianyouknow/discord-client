import styled from "styled-components";

import type { FC } from "react";
import type { CSSObject } from "styled-components";

export const DialogHeader = styled.div.withConfig({
      shouldForwardProp: (prop) => !["sx"].includes(prop),
})<{
      sx?: CSSObject;
}>`
      border-radius: 4px 4px 0 0;
      transition: box-shadow 0.1s ease-out, -webkit-box-shadow 0.1s ease-out;
      word-wrap: break-word;
      position: relative;

      padding: 16px;

      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;

      display: flex;
      ${({ sx = {} }) => sx}
`;
export const DialogContentWrapper = styled.div.withConfig({
      shouldForwardProp: (prop) => !["sx"].includes(prop),
})<{
      sx: CSSObject;
}>`
      overflow: hidden scroll;

      position: relative;
      z-index: 0;
      border-radius: 5px 5px 0 0;
      padding-left: 16px;
      padding-right: 16px;
      overflow-x: hidden;

      position: relative;
      box-sizing: border-box;
      min-height: 0;
      flex: 1 1 auto;

      transition: box-shadow 0.1s ease-out, -webkit-box-shadow 0.1s ease-out;
      word-wrap: break-word;
      position: relative;
      max-width: 480px;
`;
export const DialogFooter = styled.div.withConfig({
      shouldForwardProp: (prop) => !["sx"].includes(prop),
})<{
      sx?: CSSObject;
}>`
      box-shadow: inset 0 1px 0 hsl(var(--primary-630-hsl) / 0.6);

      border-radius: 0 0 5px 5px;
      background-color: var(--modal-footer-background);

      position: relative;
      flex: 0 0 auto;
      padding: 16px;
      z-index: 1;
      overflow-x: hidden;
      flex-direction: row-reverse;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: stretch;

      display: flex;
      ${({ sx = {} }) => sx}
`;

interface DialogContent {
      children: React.ReactNode;
      sx?: CSSObject;
}
export const DialogContent: FC<DialogContent> = (props) => {
      const { children, sx = {} } = props;
      return (
            <DialogContentWrapper className="thin-scrollbar" sx={sx}>
                  {children}
            </DialogContentWrapper>
      );
};
