import { create } from "zustand";
export interface IProfile {
    login: string;
}
interface BearState {
    profile: IProfile | null;
    setProfile: () => void;
}
const fetchApi = async (): Promise<IProfile | null> => {
    const req = await fetch("http://localhost:3000/profile", {
        method: "GET",
        credentials: "include",
    });
    const body = await req.json();
    return await body;
};
export const useProfileStore = create<BearState>()((set) => ({
    profile: null,
    setProfile: async () => {
        const profile = await fetchApi();
        set(() => {
            return {
                profile: profile,
            };
        });
    },
}));
