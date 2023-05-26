import { styled } from "@mui/system";
import Typography from "../Typography/Typography";
import { IHeader } from ".";

const Wrapper = styled("div", {
  shouldForwardProp: (props) => props !== "padding",
})<{ padding: string }>`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  height: 49px;
  width: 100%;
  padding: ${(props) => props.padding};
  border-bottom: 1px solid var(--divider-primary);
`;
export default function Header(props: IHeader) {
  const { children, padding } = props;
  return (
    <>
      <Wrapper padding={padding}>{children}</Wrapper>
    </>
  );
}
