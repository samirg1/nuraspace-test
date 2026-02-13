import { post } from ".";

export const login = async (username: string, password: string) => {
    const { user, token } = await post("/auth/login", { username, password });
    localStorage.setItem("token", token);
    return user;
};
