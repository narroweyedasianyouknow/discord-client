import { memo, useEffect, useMemo } from "react";
import styled from "styled-components";

import Portal from "@/utils/Portal";

import type { CSSProperties, FC, ReactNode } from "react";
const Wrapper = styled.div`
      z-index: 1000;
      border-radius: 4px;
      position: absolute;
      box-shadow: var(--elevation-high);
      background: var(--background-floating);
`;
const Scrollbar = styled.div`
      overflow: hidden auto;
      padding: 6px 8px;
      /* padding-right: 0px; */
`;
interface IPopup<T extends HTMLElement = HTMLElement> {
      children?: ReactNode;
      element: T | null;
      onClose: () => void;
}
const popup = document.getElementById("popup-root") as HTMLElement;

const MARGIN_8 = 8;

const Popup: FC<IPopup> = memo((props) => {
      const { children, element, onClose } = props;
      const coords: CSSProperties = useMemo(() => {
            const rect = element?.getBoundingClientRect();
            // TODO Make It Adaptive
            if (!rect) {
                  return {
                        top: "auto",
                        left: "auto",
                  };
            }
            const getHorizontalPos = () => {
                  return {
                        left: rect.left + MARGIN_8,
                        right: "none",
                  };
            };

            const getVerticalPos = () => {
                  return {
                        top: rect.bottom + MARGIN_8,
                  };
            };
            return {
                  ...getVerticalPos(),
                  ...getHorizontalPos(),
                  visibility: "visible",
            };
      }, [element]);
      useEffect(() => {
            if (element) {
                  const listener = (ev: MouseEvent) => {
                        const target = ev.target as HTMLDivElement;

                        if (target.id === popup.id) {
                              onClose();
                        }
                  };
                  document.addEventListener("click", listener);
                  return () => {
                        document.removeEventListener("click", listener);
                  };
            }
      }, [element, onClose]);
      return (
            <Portal root={popup} active={!!element}>
                  <Wrapper style={coords}>
                        <Scrollbar className="scrollbar">{children}</Scrollbar>
                  </Wrapper>
            </Portal>
      );
});

export default Popup;
