import { get } from ".";

export const getUser = async (token: string) => {
    const { user } = await get<"/user/:token">(`/user/${token}`);
    return user;
};
