import { useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import API from "@/api";
import {
  createGuildAction,
  joinGuildAction,
} from "@/containers/GuildsList/guildsActions";
import UploadIcon from "@/icons/UploadIcon";
import { useAppDispatch, useAppSelector } from "@/store";
import { storeSelector } from "@/store/storeSelector";
import { InputConstructor } from "../../containers/Authorization/components/DialogLogin";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import { DialogButtonsWrapper, Dialog, DialogInner } from "./DialogWrapper";
import type { ChangeEventHandler, MouseEventHandler } from "react";

const { getProfileLogin } = storeSelector;

const UploadAvatarWrapper = styled.div`
  filter: saturate(1);
  color: #4e5058;
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

export function DialogCreateServer({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const login = useAppSelector(getProfileLogin);
  const values = useRef({
    name: t("dialog.default_server_name", {
      users: login,
    }),
    avatar: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    values.current.name = value;
  };
  const handleUploadClick: MouseEventHandler<SVGSVGElement> = (e) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg, image/jpg, image/gif";
    input.click();
    input.onchange = (e) => {
      const element = e.target as HTMLInputElement;
      const file = element.files?.item(0);
      if (file)
        API.upload()
          .uploadAvatar({ file })
          .then((res) => {
            values.current.avatar = res.filename;
          });
    };
  };

  const handleSubmit = () => {
    dispatch(createGuildAction(values.current)).then(onClose);
  };
  return (
    <>
      <Dialog sx={{ backgroundColor: "var(--modal-background)" }}>
        <DialogInner>
          <Typography
            sx={{
              textAlign: "center",
              color: "var(--primary-860)",
              mb: 1,
            }}
            asBlock
            fontSize="24px"
            fontWeight={700}
          >
            {t("dialog.create_server_header")}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "var(--header-secondary)",
              mt: 1,
            }}
            asBlock
            fontSize="16px"
          >
            {t("dialog.create_server_subtitle")}
          </Typography>
          <UploadAvatarWrapper>
            <UploadIcon onClick={handleUploadClick} />
          </UploadAvatarWrapper>
          <InputConstructor
            text={t("dialog.input.server_name")}
            name={""}
            type={""}
            defaultValue={values.current.name}
            onChange={handleChange}
            description={
              <Typography color="--text-muted" fontSize="12px">
                {t("dialog.creating_server_description")}{" "}
                <Typography fontSize="12px" fontWeight={600} color="--blue-bg">
                  {t("dialog.link_creating_server_description")}
                </Typography>
              </Typography>
            }
          />
        </DialogInner>

        <DialogButtonsWrapper>
          <Button onClick={handleSubmit}>{t("button.create")}</Button>
        </DialogButtonsWrapper>
      </Dialog>
    </>
  );
}
export function DialogJoinServer({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const login = useAppSelector(getProfileLogin);
  const dispatch = useAppDispatch();
  const values = useRef({
    guild_id: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    values.current.guild_id = value;
  };
  const handleSubmit = () => {
    dispatch(joinGuildAction(values.current)).then(onClose);
  };
  return (
    <>
      <Dialog sx={{ backgroundColor: "var(--modal-background)" }}>
        <DialogInner>
          <Typography
            sx={{
              textAlign: "center",
              color: "var(--primary-860)",
              mb: 1,
            }}
            asBlock
            fontSize="24px"
            fontWeight={700}
          >
            {t("dialog.join_server_header")}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "var(--header-secondary)",
              mt: 1,
            }}
            asBlock
            fontSize="16px"
          >
            {t("dialog.join_server_subtitle")}
          </Typography>
          <InputConstructor
            text={t("dialog.input.server_name")}
            name={""}
            type={""}
            defaultValue={`${login}'s server`}
            onChange={handleChange}
            description={
              <Typography color="--text-muted" fontSize="12px">
                By creating a server, you agree to Discord's{" "}
                <Typography fontSize="12px" fontWeight={600} color="--blue-bg">
                  Community Guidelines
                </Typography>
              </Typography>
            }
          />
        </DialogInner>

        <DialogButtonsWrapper>
          <Button onClick={handleSubmit}>Join</Button>
        </DialogButtonsWrapper>
      </Dialog>
    </>
  );
}

export function DialogAddServer(props: {
  onClose: () => void;
  active: "create" | "join" | undefined;
}) {
  const { active, onClose } = props;
  if (active === "join") {
    return <DialogJoinServer onClose={onClose} />;
  }
  return <DialogCreateServer onClose={onClose} />;
}
