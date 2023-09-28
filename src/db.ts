import { DB_FILE } from "./app.config";
import { Db } from "./services/db";

// using singleton approach (one connection in the server)
const db_instance = new Db(DB_FILE);
db_instance.open();

export const db = db_instance;
