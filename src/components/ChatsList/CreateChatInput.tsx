import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { useCallback, useRef } from "react";
import { useAppDispatch } from "../../store";
import { createChatAction } from "../../store/storeSlice";

const ListFooterItems = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--bg-body);
`;
const ButtonWrappers = styled.form`
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  margin: 10px 15px;
`;
const Input = styled.input`
  border: 0;
  font-size: 18px;

  padding: 0.7rem 0.5rem;
  flex: 1;
  outline: none;
`;
const Button = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  &:hover {
  }
`;

export default function CreateChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (inputRef.current?.value) {
        dispatch(
          createChatAction({
            title: inputRef.current.value,
          })
        );
      }
    },
    [dispatch]
  );
  return (
    <>
      <ListFooterItems>
        <ButtonWrappers onSubmit={handleSubmit}>
          <Input ref={inputRef} type="text" defaultValue={""} />
          <Button type="submit">
            <LoginIcon />
          </Button>
        </ButtonWrappers>
      </ListFooterItems>
    </>
  );
}
