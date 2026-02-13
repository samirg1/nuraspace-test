import { WebSocketServer } from "ws";
import http from "http";
import type { Express } from "express";

export const clients = new Map<string, Set<any>>();

export const setupWebsocketServer = (app: Express) => {
    const server = http.createServer(app);
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws, req) => {
        const params = new URL(req.url!, "http://localhost").searchParams;
        const city = params.get("city") || "global";

        if (!clients.has(city)) clients.set(city, new Set());
        clients.get(city)!.add(ws);

        ws.on("close", () => {
            clients.get(city)!.delete(ws);
        });
    });

    server.listen(3001, () => {
        console.log("WS + API on http://localhost:3001");
    });
}
