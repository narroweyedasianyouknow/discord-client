import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import type { ReactNode } from "react";

const Portal = ({
    children,
    root = document.getElementById("portal-root") as HTMLElement,
    active = false,
}: {
    children: ReactNode;
    root?: HTMLElement;
    active?: boolean;
}) => {
    const mount = useRef(root);

    useEffect(() => {
        const element = mount.current;
        if (active && !element?.classList?.contains("open")) {
            element?.classList.add("open");
        } else {
            element?.classList.remove("open");
        }
    }, [active]);

    return createPortal(children, mount.current as HTMLElement);
};

export default Portal;
