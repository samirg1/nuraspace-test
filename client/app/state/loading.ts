import { create } from "zustand";

interface Loading {
    value: string | null;
    set(value: string | null): void;
    stop(): void;
}

export const useLoader = create<Loading>((set) => ({
    value: null,
    set: (value) => set({ value }),
    stop: () => set({ value: null }),
}));
