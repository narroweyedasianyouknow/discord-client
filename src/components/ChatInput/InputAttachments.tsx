import styled from "styled-components";

import RemoveIcon from "@/icons/RemoveIcon";

import Typography from "../Typography/Typography";

// eslint-disable-next-line import/namespace
import type { ExtendedFile } from "./ChatInput";

const FilesList = styled.div`
    display: flex;
    gap: 24px;
    margin: 0 0 2px 6px;
    padding: 20px 10px 10px;

    grid-area: 1 / 1 / 2 / 3;
`;
const Attachment = styled.div`
    display: inline-flex;
    border-radius: 4px;
    margin: 0;
    padding: 8px;
    min-width: 200px;
    max-width: 200px;
    min-height: 200px;
    max-height: 200px;

    position: relative;

    flex-direction: column;

    background-color: var(--background-secondary);
`;
const ImageAttachment = styled.img`
    margin-top: auto;
    position: relative;
    min-height: 0;
    width: 100%;
    height: 100%;
    display: flex;
    aspect-ratio: 1/1;
    object-fit: contain;
`;
const ActionButtons = styled.div`
    background-color: var(--background-primary);
    box-shadow: var(--elevation-stroke);

    display: flex;
    align-items: center;
    height: 32px;
    border-radius: 4px;

    transition: box-shadow 0.1s ease-out, -webkit-box-shadow 0.1s ease-out;
    position: relative;
    overflow: hidden;
    user-select: none;

    position: absolute;
    top: 0;
    right: 0;
    &:hover {
        box-shadow: var(--elevation-stroke), var(--elevation-medium);
    }
`;
const ActionIcon = styled.div<{ $removeIcon?: boolean }>`
    padding: 4px;
    height: 32px;
    width: 32px;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    min-width: 24px;
    flex: 0 0 auto;
    color: ${(prop) =>
        prop.$removeIcon
            ? "var(--status-danger)"
            : "var(--interactive-normal)"};
    cursor: pointer;
    position: relative;

    &:hover {
        color: ${(prop) =>
            prop.$removeIcon ? "var(--red-400)" : "var(--interactive-hover)"};
        background-color: var(--background-modifier-hover);
    }
    svg {
        width: 20px;
        height: 20px;
    }
`;
export default function InputAttachments(props: {
    attachments: ExtendedFile[];
    onRemove: (name: string) => void;
}) {
    const { attachments, onRemove } = props;
    if (!attachments[0]) return <></>;

    return (
        <FilesList>
            {attachments.map((v) => (
                <AttachmentItem
                    onRemove={() => {
                        onRemove(v.id);
                    }}
                    key={v.id}
                    {...v}
                />
            ))}
        </FilesList>
    );
}
type IAttachmentItem = ExtendedFile & {
    onRemove: () => void;
};
const toBase64 = ({ file }: ExtendedFile) =>
    new Promise((resolve: (file: string) => void, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>
            typeof reader.result === "string" ? resolve(reader.result) : reject;
        reader.onerror = reject;
    });
function AttachmentItem(props: IAttachmentItem) {
    const { onRemove, file } = props;
    return (
        <Attachment>
            <ImageAttachment key={file.name} src={URL.createObjectURL(file)} />
            <Typography
                sx={{
                    marginTop: "8px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}
                fontSize="14px"
                color="--text-normal"
            >
                {file.name}
            </Typography>
            <ActionButtons>
                {/* TODO ADD FUNCTIONAL SPOILER & Edit */}
                {/* <ActionIcon>
          <EyeIcon />
        </ActionIcon>
        <ActionIcon>
          <EditIcon />
        </ActionIcon> */}
                <ActionIcon onClick={onRemove} $removeIcon={true}>
                    <RemoveIcon />
                </ActionIcon>
            </ActionButtons>
        </Attachment>
    );
}
