import { create } from "zustand";

interface AuthenticationState {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const useAuthentication = create<AuthenticationState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));
