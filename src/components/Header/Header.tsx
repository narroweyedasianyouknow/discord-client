import styled from "styled-components";

import type { IHeader } from ".";
import type { CSSObject } from "styled-components";

const Wrapper = styled("div")<{
      $padding: string;
      $type: "body" | "sidebar";
      $sx: CSSObject;
}>`
      display: flex;
      align-items: center;

      box-sizing: border-box;
      height: 49px;
      width: 100%;
      padding: ${(props) => props.$padding};

      box-shadow: var(--elevation-low);
      ${(props) => props.$sx};
`;
export default function Header(props: IHeader) {
      const { children, padding, type = "body", sx = {} } = props;
      return (
            <>
                  <Wrapper $sx={sx} $type={type} $padding={padding}>
                        {children}
                  </Wrapper>
            </>
      );
}
