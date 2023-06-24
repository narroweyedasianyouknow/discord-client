import React from "react";
import styled from "styled-components";

import type { ButtonHTMLAttributes } from "react";
import type { CSSObject } from "styled-components";

interface IButton {
    children: React.ReactNode;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onSubmit?: ButtonHTMLAttributes<HTMLButtonElement>["onSubmit"];
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    sx?: CSSObject;
}
const ButtonWrapper = styled("button").withConfig({
    shouldForwardProp(prop) {
        return !["sx"].includes(prop);
    },
})<{
    sx: CSSObject;
}>`
    border: none;

    color: var(--white-500);
    background-color: var(--brand-experiment);

    margin-bottom: 8px;

    display: flex;
    align-items: center;
    padding: 2px 16px;
    border-radius: 3px;
    font-weight: 500;

    cursor: pointer;
    user-select: none;

    width: 100%;
    height: 44px;
    min-width: 130px;
    min-height: 44px;

    font-size: 16px;
    line-height: 24px;

    outline: none;

    transition: background-color 0.17s ease, color 0.17s ease;
    &:hover {
        background-color: var(--brand-560);
    }
    ${(props) => props.sx}
`;
const InnerContent = styled("div")`
    margin: 0 auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: baseline;
`;
export default function Button(props: IButton) {
    const { children, type, onSubmit, onClick, sx = {} } = props;
    return (
        <>
            <ButtonWrapper
                sx={sx}
                type={type}
                onClick={onClick}
                onSubmit={onSubmit}
            >
                <InnerContent>{children}</InnerContent>
            </ButtonWrapper>
        </>
    );
}
