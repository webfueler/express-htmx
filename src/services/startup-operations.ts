import { existsSync } from "node:fs";
import { DB_FILE, ENVIRONMENTS } from "../app.config";
import { Db } from "./db";
import { IoOperations } from "./io";
import type { MfeInfo } from "../models/schema";

export class StartupOperations {
  /**
   * initializes database with default environments if it doesn't already exist
   */
  public static initDatabase = async (): Promise<boolean> => {
    if (!existsSync(DB_FILE)) {
      console.info(`Creating new database... ${DB_FILE}`);
      const db = new Db(DB_FILE);

      await db.open();
      await db.database.exec(
        "CREATE TABLE IF NOT EXISTS environments(id INTEGER PRIMARY KEY ASC, name TEXT UNIQUE)",
      );
      await db.database.exec(
        "CREATE TABLE IF NOT EXISTS maps(id_environment INT, name TEXT, js TEXT, css TEXT)",
      );

      const extraQueries = ENVIRONMENTS.map(
        (env) => `INSERT INTO environments (name) VALUES ('${env}')`,
      );

      for (const query of extraQueries) {
        await db.database.exec(query);
      }
      await db.close();
      return true;
    }
    return false;
  };

  /**
   * updates json files in public folder
   */
  public static updateEnvironmentFiles = async () => {
    const db = new Db(DB_FILE);
    await db.open();

    const allEnvs = await db.database.all<Array<{ id: number; name: string }>>(
      "SELECT id, name FROM environments",
    );

    for (const env of allEnvs) {
      const filename = `${env.name}.json`;
      const data = await db.database.all<
        Array<{
          id: number;
          id_environment: number;
          name: string;
          js: string;
          css: string;
          env_name: string;
        }>
      >(
        `SELECT * FROM maps 
         WHERE id_environment=?`,
        [env.id],
      );

      const result: MfeInfo = {};
      for (const map of data) {
        result[map.name] = { jsBundle: map.js, cssBundle: map.css };
      }

      await IoOperations.save(filename, result);
    }
  };
}
