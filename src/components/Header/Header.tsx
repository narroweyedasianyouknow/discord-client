import styled from "styled-components";

import type { CSSObject } from "@/themes/colorsTypes";

import type { IHeader } from ".";

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
      const { children, padding, type = "body", sx = {}, onClick } = props;
      return (
            <>
                  <Wrapper $sx={sx} $type={type} $padding={padding} onClick={onClick}>
                        {children}
                  </Wrapper>
            </>
      );
}
