import { DB_FILE } from "./app.config";
import { Db } from "./services/db";

// using singleton approach (one connection in the server)
const db_instance = new Db(DB_FILE);

const getDb = async () => {
  if (db_instance.isOpen) {
    return db_instance;
  }

  await db_instance.open();
  return db_instance;
};

export const db = getDb;
