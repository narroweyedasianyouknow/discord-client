import { styled } from "@mui/material";

export type ColorsListType =
  | "transparent"
  | "--modal-background"
  | "--text-muted"
  | "--blue-bg"
  | "--black-500"
  | "--brand-color"
  | "--brand-color-560"
  | "--bg-body"
  | "--bg-chat-body"
  | "--bg-guilds-body"
  | "--text-100"
  | "--text-90"
  | "--text-80"
  | "--header-light"
  | "--header-dark"
  | "--bg-second"
  | "--bg-active"
  | "--sidebar-primary"
  | "--sidebar-second"
  | "--divider-primary"
  | "--divider-body";

const Typography = styled("span", {
  shouldForwardProp: (props) =>
    !["fontWeight", "color", "fontSize", "textTransform", "asBlock", 'sx'].some(
      (val) => val === props
    ),
})<{
  fontWeight?: number;
  fontSize?: string;
  color?: ColorsListType;
  backgroundColor?: ColorsListType;
  textTransform?:
    | "none"
    | "capitalize"
    | "uppercase"
    | "lowercase"
    | "full-width"
    | "full-size-kana";
  asBlock?: boolean;
}>(
  ({
    color = "--text-100",
    fontSize = "16px",
    fontWeight = 400,
    textTransform = "none",
    asBlock = false,
    backgroundColor = "transparent",
  }) => ({
    fontWeight,
    fontSize,
    color: `var(${color})`,
    textTransform,
    backgroundColor:
      backgroundColor === "transparent"
        ? "transparent"
        : `var(${backgroundColor})`,
    display: asBlock ? "block" : "unset",
  })
);
export default Typography;
