import { post } from ".";

export const login = async (username: string, password: string) => {
    const { user } = await post("/auth/login", { username, password });
    return user;
};
