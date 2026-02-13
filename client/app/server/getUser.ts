import { get } from ".";

export const getUser = async () => {
    const { user } = await get("/user");
    return user;
};
