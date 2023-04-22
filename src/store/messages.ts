import { create } from "zustand";
export interface Message {
    fromMe?: boolean;
    message?: string;
    ts: number
}
interface BearState {
    store: Message[];
    addMessage: (message: Message) => void;
}

export const useMessagesStore = create<BearState>()((set) => ({
    store: [],
    addMessage: (newMsg: Message) =>
        set((store) => {
            console.log(newMsg);
            return {
                store: [...store.store, newMsg],
            };
        }),
}));
