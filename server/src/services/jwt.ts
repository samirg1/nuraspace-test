import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.ts";

const JWT_EXPIRES_IN = "7d";

export function signToken(payload: { username: string }) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
