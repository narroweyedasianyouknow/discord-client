import styled from "styled-components";
import "./Loader.css";

const BoxWrapper = styled.div`
      position: relative;
      background-color: rbg(49, 51, 56);
      min-width: 300px;
      min-height: 400px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
`;
const BoxItem = styled.div`
      position: absolute;

      will-change: transform;

      height: 10px;
      width: 10px;
      background-color: var(--brand-560);
`;
export default function Loader() {
      return (
            <>
                  <BoxWrapper>
                        <BoxItem className="first" />
                        <BoxItem className="second" />
                  </BoxWrapper>
            </>
      );
}
