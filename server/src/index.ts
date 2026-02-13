import express from "express";
import { setupDatabase } from "./accessDatabase.ts";
import router from "./routes/index.ts";
import cors from "cors";
import { setupWebsocketServer } from "./websocket.ts";
import { messageRouter } from "./routes/message.ts";

const app = express();
const port = 3000;


app.get("/health", (_, res) => {
    res.send("Server is healthy");
});

app.use(express.json());
app.use(cors());
app.use("/", router);
app.use("/message", messageRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    setupWebsocketServer(app);
    setupDatabase().then(() => {
        console.log("Database setup complete");
    }).catch((error) => {
        console.error("Error setting up database:", error);
    });
});
