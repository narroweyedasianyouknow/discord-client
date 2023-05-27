import { io } from "socket.io-client";
import type { IMessage } from "./interfaces";

export function uuidv4(): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts?.pop()?.split(";").shift();
}
const socket = (addMessage: (message: IMessage) => void) => {
  const socket = io("http://localhost:3000/", {
    reconnectionDelay: 10000,
    transports: ["websocket"],
    auth: {
      token: getCookie("token"),
    },
  });

  socket.on(
    "add-message",
    (data: {
      id: string;
      subject_id: string;
      text_content: string;
      ts: number;
      user_id: string;
      user_name: string;
    }) => {
      addMessage(data);
    }
  );
  return () => {
    socket.close();
  };
};
export default socket;
