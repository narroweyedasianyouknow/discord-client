import type { ReactNode } from "react";

export interface ITypography {
    color?: string;
    asBlock?: boolean;
    children: ReactNode;
    fontWeight?: number;
    fontSize?: string;
    textTransform?:
        | "none"
        | "capitalize"
        | "uppercase"
        | "lowercase"
        | "full-width"
        | "full-size-kana";
}
