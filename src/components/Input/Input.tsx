import { memo } from "react";
import styled from "styled-components";

import type { HTMLAttributes } from "react";

const ComponentWrapper = styled.div`
      box-sizing: border-box;
      width: 100%;
      border-radius: 3px;
      color: var(--text-normal);
      background-color: var(--input-background);
      transition: border-color 0.2s ease-in-out;
      font-family: var(--font-primary);
      text-rendering: optimizeLegibility;
      justify-content: center;
      align-items: center;
      display: flex;
      vertical-align: baseline;
`;
const InputWrapper = styled.div`
      display: flex;
      flex-direction: column;
      flex-grow: 1;
`;
//
const RightItemWrapper = styled.div`
      margin-right: 4px;
      width: auto;
      height: auto;
      min-width: 60px;
      min-height: 100%;
      display: flex;
      align-items: center;
      * {
            min-width: auto;
            min-height: auto;
            height: 100%;
            margin: 0;
      }
`;
const InputItem = styled.input<{ $size: IInput["size"] }>`
      border: none;
      font-size: 16px;
      width: 100%;
      outline: 0;
      font-weight: 400;

      font-family: var(--font-primary);
      text-rendering: optimizeLegibility;

      background-color: var(--input-background);
      ${({ $size }) => getSize($size)}
`;
interface IInput {
      value?: string | number;
      defaultValue?: string | number;
      label?: string;
      rightElement?: React.ReactNode;
      onChange?: HTMLAttributes<HTMLInputElement>["onChange"];
      size?: "s" | "auto";
      readOnly?: boolean | undefined
}
function getSize(size: IInput["size"]) {
      switch (size) {
            case "s":
                  return {
                        height: "40px",
                        padding: "10px",
                  };
            default:
                  return {
                        height: "100%",
                  };
      }
}
const Input: React.FC<IInput> = memo((props) => {
      const {
            defaultValue,
            label,
            rightElement,
            value,
            size = "auto",
            readOnly,
            onChange,
      } = props;
      const button = rightElement ? (
            <RightItemWrapper>{rightElement}</RightItemWrapper>
      ) : (
            <></>
      );
      return (
            <ComponentWrapper>
                  <InputWrapper>
                        <InputItem
                              onChange={onChange}
                              $size={size}
                              readOnly={readOnly}
                              defaultValue={defaultValue}
                              value={value}
                        />
                  </InputWrapper>
                  {button}
            </ComponentWrapper>
      );
});

export default Input;
