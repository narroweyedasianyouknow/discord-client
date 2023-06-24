import React from "react";

import "./Tooltip.scss";
import classNames from "@/hooks/classNames";
interface Tooltip {
    arrow?: "top" | "bottom" | "left" | "right";
    className?: string;
    hint?: string;
    content?: string;
}
const Tooltip = React.memo((props: Tooltip) => {
    const { arrow = "bottom", className, hint, content } = props;
    const tooltipClassName = classNames(className, {
        tooltip: true,
        [`tooltip--arrow-${arrow}`]: arrow,
    });
    return (
        <>
            <div className={tooltipClassName}>
                {/* <Arrow id="tooltip-arrow" className={"arrow"} /> */}
                {hint && <div className="tooltip__title">{hint}</div>}
                {content && <div className="tooltip__content">{content}</div>}
            </div>
        </>
    );
});

export default Tooltip;
