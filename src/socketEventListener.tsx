import { io } from "socket.io-client";
import { Message } from "./store/messages";
import { IProfile } from "./store/profile";

declare global {
    interface Window {
        onSubmitMessage: (msg: string) => void;
    }
}
function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(";").shift();
}
const socket = (
    addMessage: (message: Message) => void,
    profile: IProfile | null
) => {
    const socket = io("http://localhost:3000/", {
        reconnectionDelay: 10000,
        transports: ["websocket"],
        auth: {
            token: getCookie("token"),
        },
    });

    window.onSubmitMessage = (msg) =>
        socket.emit("emit-message", { message: msg, ts: +new Date() });
    socket.on("on-messages", (data: any) => {
        addMessage({ ...data, fromMe: data?.user === profile?.login });
    });
    socket.on("to-disconnect", (data: any) => {
        console.log(data);
    });

    return () => {
        socket.close();
    };
};
export default socket;
