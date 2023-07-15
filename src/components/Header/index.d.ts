import type { CSSObject } from "@/themes/colorsTypes";

import type { MouseEventHandler, ReactNode } from "react";

export interface IHeader {
      children: ReactNode;
      onClick?: MouseEventHandler<HTMLDivElement> | undefined;
      padding: string;
      type?: "sidebar" | "body";
      sx?: CSSObject;
}
