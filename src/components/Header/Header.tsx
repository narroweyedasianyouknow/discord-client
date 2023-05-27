import { styled } from "@mui/system";
import type { IHeader } from ".";

const Wrapper = styled("div", {
  shouldForwardProp: (props) => !["padding", "borderColor"].some((v) => v === props),
})<{ padding: string; borderColor: "body" | "sidebar" }>`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  height: 49px;
  width: 100%;
  padding: ${(props) => props.padding};
  border-bottom: 1px solid
    ${(props) =>
      props?.borderColor === "body"
        ? "var(--divider-body)"
        : "var(--divider-primary)"};
`;
export default function Header(props: IHeader) {
  const { children, padding, type = "body" } = props;
  return (
    <>
      <Wrapper borderColor={type} padding={padding}>
        {children}
      </Wrapper>
    </>
  );
}
