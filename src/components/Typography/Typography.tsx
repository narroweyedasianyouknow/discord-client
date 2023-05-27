import { styled } from "@mui/material";
import type { ITypography } from ".";

const TextWrapper = styled("span", {
  shouldForwardProp: (props) =>
    !["fontWeight", "color", "fontSize"].some((val) => val === props),
})<{
  fontWeight: number;
  fontSize: string;
  color: string;
}>(({ color, fontWeight, fontSize }) => ({
  fontWeight,
  fontSize,
  color: `var(${color})`,
}));
export default function Typography(props: ITypography) {
  const {
    color = "--text-100",
    fontSize = "16px",
    fontWeight = 400,
    children,
  } = props;
  return (
    <>
      <TextWrapper fontSize={fontSize} fontWeight={fontWeight} color={color}>
        {children}
      </TextWrapper>
    </>
  );
}
