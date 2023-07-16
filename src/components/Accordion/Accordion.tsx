import React, { useRef } from "react";
import styled from "styled-components";

import AddIcon from "@/icons/AddIcon";
import ChevronIcon from "@/icons/ChevronIcon";

import Typography from "../Typography/Typography";

import type { FC } from "react";

type IAccordion = {
      title: string;
      content: React.ReactNode;
      contentOnClosed: React.ReactNode;
      opened?: boolean;
      onChange?: (newState: boolean) => void;
      onPlusClick?: React.MouseEventHandler<SVGSVGElement> | undefined
};

const AccordionWrapper = styled.div``;
const AccordionHeaderWrapper = styled.div`
      height: 24px;
      display: flex;
      align-items: center;
      color: var(--channels-default);
      cursor: pointer;
      user-select: none;
      .chevron {
            width: 12px;
            height: 12px;
      }
`;

const Accordion: FC<IAccordion> = (props: IAccordion) => {
      const {
            title,
            content,
            contentOnClosed,
            opened = true,
            onPlusClick,
            onChange,
      } = props;
      const contentRef = useRef<HTMLHeadingElement>(null);

      const toggleContent = () => {
            if (onChange) onChange(!opened);
      };
      const render = opened ? (
            <div className={"accordion__content"}>{content}</div>
      ) : (
            contentOnClosed
      );
      return (
            <AccordionWrapper className={"accordion"}>
                  <AccordionHeaderWrapper onClick={toggleContent}>
                        <ChevronIcon className="chevron" />
                        <Typography
                              fontSize="12px"
                              fontWeight={600}
                              sx={{
                                    letterSpacing: ".02em",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    textTransform: "uppercase",
                                    flex: "1",
                              }}
                        >
                              {title}
                        </Typography>
                        <AddIcon onClick={onPlusClick} />
                  </AccordionHeaderWrapper>

                  <div ref={contentRef} className={`accordion__content-wrap`}>
                        {render}
                  </div>
            </AccordionWrapper>
      );
};

export default Accordion;
