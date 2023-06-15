import { io } from "socket.io-client";
import { BACKEND_URI } from "@/constants";
import type { MessagesType } from "../containers/ChatBody/MessagesWrapper/messages.interface";

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
const socket = (addMessage: (message: MessagesType) => void) => {
  const socket = io(BACKEND_URI, {
    reconnectionDelay: 10000,
    transports: ["websocket"],
    auth: {
      token: getCookie("token"),
    },
  });

  socket.on("add-message", (data: MessagesType) => {
    console.log(data);
    addMessage(data);
  });
  return () => {
    socket.close();
  };
};
export default socket;
