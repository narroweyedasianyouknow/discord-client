import { io } from "socket.io-client";
import { BACKEND_URI } from "@/constants";
import { addMessageStore } from "@/containers/ChatBody/MessagesWrapper/messagesStorage";
import store from "@/store";
import type { MessagesType } from "@containers/ChatBody/MessagesWrapper/messages.interface";
import type { Socket } from "socket.io-client";

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
// const socket = () => {
//   const socket = io(BACKEND_URI, {
//     reconnectionDelay: 10000,
//     transports: ["websocket"],
//     query: {
//       userId: getCookie("token"),
//     },
//     auth: {
//       token: getCookie("token"),
//     },
//   });

//   socket.on("add-message", (data: MessagesType) => {
//     console.log(data);
//     dispatch(addMessageStore(data));
//   });
//   return () => {
//     socket.close();
//   };
// };

type MessageEvents = {
  "add-message": (message: MessagesType) => void;
};
type WebRtcEmits = {
  offer: () => void;

  answer: () => void;

  iceCandidate: () => void;
};
type DefaultEventsMap = MessageEvents & WebRtcEmits;
type DefaultEmitsMap = WebRtcEmits;
export class SocketSingleton {
  private static instance: SocketSingleton;
  private readonly socket: Socket<DefaultEventsMap, DefaultEmitsMap>;

  constructor() {
    this.socket = io(BACKEND_URI, {
      reconnectionDelay: 10000,
      transports: ["websocket"],
      auth: {
        token: getCookie("token"),
      },
    });
  }

  public static getInstance(): SocketSingleton {
    if (!SocketSingleton.instance) {
      SocketSingleton.instance = new SocketSingleton();
    }
    return SocketSingleton.instance;
  }

  public getSocket(): Socket {
    return this.socket;
  }
}
export class SocketConfig {
  private readonly socket = SocketSingleton.getInstance().getSocket();
  private readonly dispatch = store.dispatch;

  subscribe() {
    this.socket.on("add-message", (message) => {
      this.dispatch(addMessageStore(message));
    });
  }

  close() {
    return this.socket.close();
  }
}
