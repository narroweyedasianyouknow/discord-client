import { create } from "zustand";

interface BearState {
    store: string;
    setValue: (message: string) => void;
}

export const useInputStore = create<BearState>()((set) => ({
    store: "",
    setValue: (newMsg: string) =>
        set((store) => {
            return {
                store: newMsg,
            };
        }),
}));
