import type { MouseEventHandler, ReactNode } from "react";
import type { CSSObject } from "styled-components";

export interface IHeader {
      children: ReactNode;
      onClick?: MouseEventHandler<HTMLDivElement> | undefined;
      padding: string;
      type?: "sidebar" | "body";
      sx?: CSSObject;
}
