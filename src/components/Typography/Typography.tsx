import { styled } from "@mui/material";
import type { ITypography } from ".";

const TextWrapper = styled("span", {
  shouldForwardProp: (props) =>
    !["fontWeight", "color"].some((val) => val === props),
})<{
  fontWeight: number;
  color: string;
}>(({ color, fontWeight }) => ({
  fontWeight,
  color: `var(${color})`,
}));
export default function Typography(props: ITypography) {
  const { color = "--text-100", fontWeight = 400, children } = props;
  return (
    <>
      <TextWrapper fontWeight={fontWeight} color={color}>
        {children}
      </TextWrapper>
    </>
  );
}
