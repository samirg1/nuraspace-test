import cors from "cors";
import express from "express";
import { setupDatabase } from "./accessDatabase.ts";
import { requireAuth } from "./middleware/authentication.ts";
import { privateRouter } from "./routes/private/index.ts";
import { publicRouter } from "./routes/public/index.ts";
import { messageRouter } from "./routes/public/message.ts";
import { setupWebsocketServer } from "./websocket.ts";

const app = express();
const port = 3000;

app.get("/health", (_, res) => {
    res.send("Server is healthy");
});

app.use(express.json(), cors());
app.use("/", publicRouter);
app.use("/message", messageRouter);
app.use(requireAuth);
app.use("/", privateRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    setupWebsocketServer(app);
    setupDatabase()
        .then(() => {
            console.log("Database setup complete");
        })
        .catch((error) => {
            console.error("Error setting up database:", error);
        });
});
