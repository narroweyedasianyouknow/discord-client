import { useRef } from "react";
import styled from "styled-components";
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
  const dispatch = useAppDispatch();

  const login = useAppSelector(getProfileLogin);
  const values = useRef({
    name: "",
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

      console.log(file);
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
            Customize your server
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
            Give your new server a personality with a name and an icon. You can
            always change it later.
          </Typography>
          <UploadAvatarWrapper>
            <UploadIcon onClick={handleUploadClick} />
          </UploadAvatarWrapper>
          <InputConstructor
            text={"Server Name"}
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
          <Button onClick={handleSubmit}>Create</Button>
        </DialogButtonsWrapper>
      </Dialog>
    </>
  );
}
export function DialogJoinServer({ onClose }: { onClose: () => void }) {
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
            Customize your server
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
            Give your new server a personality with a name and an icon. You can
            always change it later.
          </Typography>
          <InputConstructor
            text={"Server Name"}
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
