import { memo } from "react";
import styled from "styled-components";

import { GroupItem, type IGroupItem } from "./GroupItem";

import type { FC } from "react";
interface IGroupItemsList {
      content: IGroupItem[];
}
const ListWrapper = styled.div`
      display: flex;
      width: 100%;
      flex-direction: column;
`;
const GroupItemsList: FC<IGroupItemsList> = memo((props) => {
      const { content } = props;
      return (
            <ListWrapper>
                  {content.map((v) => (
                        <GroupItem {...v} />
                  ))}
            </ListWrapper>
      );
});

export default GroupItemsList;
