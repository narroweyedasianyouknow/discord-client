import React from "react";
import styled from "styled-components";
import { useInputStore } from "../store/input";
import SendIcon from "../icons/SendIcon";

const Form = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 35px;
    gap: 5px;
    max-width: 400px;
    align-items: center;
    padding: 5px 10px;

    margin: 0 auto;
`;
const Input = styled.input`
    height: 54px;
    width: 100%;
    border: none;
    border-radius: 16px;
    outline: none;
    padding: 15px;
    font-size: 16px;
`;
const Submit = styled.button`
    max-height: 35px;
    aspect-ratio: 1/1;
    width: 35px;
    border-radius: 50%;
    height: 100%;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    color: #383838;
    margin: 0;
    &:hover {
        background: #383838;
        color: #ffffff;
    }
    &:active {
        background: #1d1d1d;
        color: #ffffff;
    }
`;
const InputForm = () => {
    const { setValue, store } = useInputStore();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (store.length > 0) {
            window?.onSubmitMessage(store);
            setValue("");
        }
    };
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="input">
                    <Input
                        placeholder="Message"
                        value={store}
                        onChange={handleChange}
                    />
                </div>
                <Submit type="submit">
                    <SendIcon />
                </Submit>
            </Form>
        </>
    );
};

export default InputForm;
