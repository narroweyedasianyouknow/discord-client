import dayjs from "dayjs";
import styled from "styled-components";
import Typography from "../Typography/Typography";

const StickyItemWrapper = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const StickyItemBlock = styled("div").withConfig({
  shouldForwardProp: (props) => props !== "hidden",
})<{ hidden: boolean }>((props) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--bg-overlay-chat,var(--background-primary))",
  borderRadius: "12px",
  padding: "0.1rem 0.7rem",
  ...(!props.hidden
    ? {
        position: "absolute",
        top: "0",
        left: "50%",
        transform: "translate(-50%, -0)"
      }
    : {
        visibility: "hidden",
      }),
}));
const HorizontalLine = styled("div")`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--background-modifier-accent);
  border-radius: 12px;
  top: 50%;
  height: 1px;
  width: 100%;
  position: absolute;
`;
export default function StickyItem(props: { ts?: string }) {
  const { ts } = props;
  // 
  return (
    <>
      <StickyItemWrapper>
        <HorizontalLine />
        <StickyItemBlock hidden={true}>
          <Typography fontSize="12px" fontWeight={600}>
            {ts ? dayjs(ts).format("YYYY-MM-DD") : "New Message"}
          </Typography>
        </StickyItemBlock>
        <StickyItemBlock hidden={false}>
          <Typography fontSize="12px" fontWeight={600} color="--text-muted">
            {ts ? dayjs(ts).format("DD MMM YYYY") : "New Message"}
          </Typography>
        </StickyItemBlock>
      </StickyItemWrapper>
    </>
  );
}
