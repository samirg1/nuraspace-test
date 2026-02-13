import { getUserByUsername } from "../../accessDatabase.ts";
import { compareStringToHash } from "../../services/bcrypt.ts";
import { signToken } from "../../services/jwt.ts";
import type { HandlersRecord } from "../baseRoute.ts";

const DEFAULT_LOGIN_ERROR_MESSAGE = "Invalid username or password";

export const authRoutes: Pick<
    HandlersRecord,
    "/auth/login" | "/auth/register"
> = {
    "/auth/login": {
        method: "post",
        handler: async (_, __, body) => {
            const { username, password } = body;
            if (!username || !password)
                return {
                    error: {
                        message: "Username and password are required",
                        code: 400,
                    },
                };
            const user = await getUserByUsername(username);
            if (!user)
                return {
                    error: { message: DEFAULT_LOGIN_ERROR_MESSAGE, code: 401 },
                };
            const isPasswordValid = await compareStringToHash(
                password,
                user.password,
            );
            if (!isPasswordValid)
                return {
                    error: { message: DEFAULT_LOGIN_ERROR_MESSAGE, code: 401 },
                };

            const token = signToken({ username });

            return { user, token };
        },
    },
    "/auth/register": {
        method: "post",
        handler: async (_, __, body) => {
            const { username, password } = body;
            if (!username || !password)
                return {
                    error: {
                        message: "Username and password are required",
                        code: 400,
                    },
                };
            // register here
            return { user: { username, password, name: "", email: "" } };
        },
    },
};
