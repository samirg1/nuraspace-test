// db is stored in ../../store.json
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Database = {
    users: User[]
}

let database: null | Database = null;

export const setupDatabase = async () => {
    const db = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "../../store.json"), "utf-8"),
    );
    database = db;
};

export const getUserByUsername = async (username: string) => {
    if (!database) throw new Error("Database not initialized");
    const users = database.users;
    return users.find((user) => user.username === username);
};
