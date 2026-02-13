import { getUserByUsername } from "../../accessDatabase.ts";
import type { HandlersRecord } from "../baseRoute.ts";

export const userRoute: Pick<HandlersRecord, "/user/:token"> = {
    "/user/:token": {
        method: "get",
        //@ts-expect-error user is in the req
        handler: async ({ user }) => {
            if (!user) return { error: { message: "User not found", code: 404 } };
            return { user };
        },
    },
};
