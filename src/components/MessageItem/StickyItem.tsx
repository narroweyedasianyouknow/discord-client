import dayjs from "dayjs";
import styled from "styled-components";

const StickyItemWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 50%;
  display: flex;
  justify-content: center;
`;
const StickyItemBlock = styled.div`
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-second);
  border-radius: 12px;
  padding: 0.1rem 0.7rem;
  color: var(--bg-body);
`;
export default function StickyItem(props: { ts?: string }) {
  const { ts } = props;
  return (
    <>
      <StickyItemWrapper>
        <StickyItemBlock>
          {ts ? dayjs(ts).format("YYYY-MM-DD") : "New Message"}
        </StickyItemBlock>
      </StickyItemWrapper>
    </>
  );
}
