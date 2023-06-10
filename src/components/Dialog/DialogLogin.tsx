import { styled } from "@mui/material";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store";
import { loginAction } from "@/store/storeSlice";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import type { ChangeEventHandler, FormEventHandler } from "react";
const DialogInner = styled("form")`
  background: var(--bg-body);
  border-radius: 4px;
  padding: 32px;
  min-width: 480px;
`;

const Input = styled("input")`
  margin-top: 5px;
  width: 100%;
  border: none;
  outline: none;
  padding: 10px;
  height: 40px;
  font-size: 16px;
  border-radius: 3px;
  /* background: #1e1f22; */
  background-color: var(--input-background);
  color: var(--text-normal);
`;

const InputWrapper = styled("div")`
  margin-top: 15px;
`;
const Header = styled("div")`
  text-align: center;
  margin-bottom: 20px;
`;
export function InputConstructor(props: {
  text: string;
  name: string;
  type: string;
  defaultValue?: string;
  description?: React.ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  const { onChange, description, text, name, defaultValue, type } = props;
  return (
    <InputWrapper>
      <Typography
        asBlock
        textTransform="uppercase"
        color="--header-light"
        fontWeight={700}
        fontSize="14px"
      >
        {text}
      </Typography>
      <Input
        type={type}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      {description}
    </InputWrapper>
  );
}
export default function DialogLogin() {
  const { t } = useTranslation();
  const values = useRef({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name as "email" | "password";
    const value = e.target.value;
    values.current[name] = value;
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(values);
    const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const val = !regex.test(values.current.email)
      ? {
          username: values.current.email,
          password: values.current.password,
        }
      : values.current;
    dispatch(loginAction(val));
  };
  return (
    <>
      <DialogInner sx={{}} onSubmit={handleSubmit}>
        <Header>
          <div>
            <Typography fontSize="24px" fontWeight={600}>
              {t("login.welcome_back")}
            </Typography>
          </div>
          <Typography color="--header-light" fontSize="16px">
            {t("login.we_glad_to_see_you_again")}
          </Typography>
        </Header>
        <InputConstructor
          onChange={handleChange}
          name="email"
          type="text"
          text={t("profile.label.email")}
        />
        <InputConstructor
          type="password"
          name="password"
          onChange={handleChange}
          text={t("profile.label.password")}
        />
        <Button
          sx={{
            mt: "8px",
          }}
          type="submit"
        >
          {t("button.login")}
        </Button>
      </DialogInner>
    </>
  );
}
export function DialogRegister() {
  const { t } = useTranslation();
  const values = useRef({
    email: "",
    password: "",
  });
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name as "email" | "password";
    const value = e.target.value;
    if (values.current[name]) {
      values.current[name] = value;
    }
  };
  return (
    <>
      <DialogInner>
        <Header>
          <div>
            <Typography fontSize="24px" fontWeight={600}>
              {t("register.create_account")}
            </Typography>
          </div>
        </Header>
        <InputConstructor
          onChange={handleChange}
          type="text"
          name="email"
          text={t("profile.label.email")}
        />
        <InputConstructor
          onChange={handleChange}
          type="username"
          name="text"
          text={t("profile.label.username")}
        />
        <InputConstructor
          type="password"
          name="password"
          onChange={handleChange}
          text={t("profile.label.password")}
        />
        <Button
          onSubmit={(e) => {
            e.preventDefault();
            //
          }}
          sx={{
            mt: "16px",
          }}
          type="submit"
        >
          {t("button.continue")}
        </Button>
      </DialogInner>
    </>
  );
}
