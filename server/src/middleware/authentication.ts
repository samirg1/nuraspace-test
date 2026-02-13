import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../constants.ts";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = header.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // @ts-expect-error
        req.user = decoded as { username: string };
        next();
    } catch {
        return res.status(401).json({ error: "Unauthorized" });
    }
}
