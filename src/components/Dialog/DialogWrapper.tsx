import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Portal from "@/Portal";
import type { ColorsListType } from "../Typography/Typography";
export const DialogInner = styled("div")`
  padding: 32px;
  padding-bottom: 0;
  max-width: 480px;
  width: 100%;
`;
const DialogContainer = styled("div").withConfig({
  shouldForwardProp(propName) {
    return !["bgColor"].includes(propName);
  },
})<{
  bgColor?: ColorsListType;
}>(({ bgColor }) => ({
  // height: "100%",
  flexDirection: "column",
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: "var(--brand-color)",
  justifyContent: "center",
  borderRadius: "4px",
  zIndex: 1001,
}));
export const Dialog = styled("div")`
  border-radius: 5px;
  overflow: hidden;
`;

export const DialogButtonsWrapper = styled("div")`
  background-color: var(--modal-footer-background);
  padding: 16px;
  max-width: 480px;
  width: 100%;
`;
export default function DialogWrapper(props: {
  children: React.ReactNode;
  active: boolean;
  bgColor?: ColorsListType;
  onClose: () => void;
}) {
  const { children, bgColor, active, onClose } = props;
  const rootItem = useRef(
    document.getElementById("dialog-root") as HTMLElement
  );

  useEffect(() => {
    const listener = (ev: MouseEvent) => {
      const target = ev.target as HTMLDivElement;

      if (target.id === "dialog-root") {
        onClose();
      }
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [onClose]);
  useEffect(() => {
    if (bgColor && rootItem.current) {
      rootItem.current.style.backgroundColor = `var(${bgColor})`;
    }
  }, [bgColor]);
  return (
    <>
      <Portal active={active} root={rootItem.current}>
        {active ? <DialogContainer>{children}</DialogContainer> : <></>}
      </Portal>
    </>
  );
}
