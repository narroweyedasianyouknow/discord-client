import styled from "styled-components";

import type { CSSObject, ColorsListType } from "@/themes/colorsTypes";


const Typography = styled("span").withConfig({
      shouldForwardProp: (props) =>
            ![
                  "fontWeight",
                  "color",
                  "fontSize",
                  "textTransform",
                  "asBlock",
                  "sx",
            ].some((val) => val === props),
})<{
      sx?: CSSObject;
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
            color = "inherit",
            fontSize = "inherit",
            fontWeight = "inherit",
            textTransform = "none",
            asBlock = false,
            backgroundColor = "transparent",
            sx = {},
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
            ...sx,
      })
);
export default Typography;
