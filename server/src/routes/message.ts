import { Router } from "express";
import { clients } from "../websocket.ts";

const messageRouter = Router();

messageRouter.post("/", (req, res) => {
    const { city, text } = req.body;

    const targets = clients.get(city) || [];
    for (const ws of targets) {
        ws.send(JSON.stringify({ city, text }));
    }

    res.json({ success: true });
});

export { messageRouter };
