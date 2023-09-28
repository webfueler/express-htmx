import { DB_FILE, ENVIRONMENTS } from "./app.config";
import { Db } from "./services/db";
import { existsSync } from "node:fs";

const initDatabase = async () => {
  const db_instance = new Db(DB_FILE);

  if (!existsSync(DB_FILE)) {
    await db_instance.initialize(
      ENVIRONMENTS.map(
        (env) => `INSERT INTO environments (name) VALUES ('${env}')`,
      ),
    );
  }
};

// using singleton approach (one connection in the server)
const db_instance = new Db(DB_FILE);
db_instance.open();

export const db = db_instance;
export { initDatabase };
