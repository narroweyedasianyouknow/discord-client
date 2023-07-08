import type { CSSObject } from "styled-components";

export interface IHeader {
      children: JSX.Element[] | JSX.Element;
      padding: string;
      type?: "sidebar" | "body";
      sx?: CSSObject;
}
