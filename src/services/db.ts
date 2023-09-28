import sqlite3 from "sqlite3";
import { open, type Database } from "sqlite";

export class Db {
  private db?: Database<sqlite3.Database, sqlite3.Statement>;

  constructor(private file: string) {}

  get database(): Database {
    if (!this.db) {
      throw new Error(
        "Connection to database is closed. Call `open` method before getting the database.",
      );
    }
    return this.db;
  }

  public open = async (): Promise<
    Database<sqlite3.Database, sqlite3.Statement>
  > => {
    this.db = await open({
      filename: this.file,
      driver: sqlite3.Database,
    });
    return this.db;
  };

  public close = async (): Promise<void> => {
    if (!this.db) {
      throw new Error("Database connection was already closed");
    }
    await this.db.close();
    this.db = undefined;
  };

  public initialize = async (extraQueries?: string[]): Promise<void> => {
    const db = await this.open();
    await db.exec(
      "CREATE TABLE IF NOT EXISTS environments(id INTEGER PRIMARY KEY ASC, name TEXT)",
    );
    await db.exec(
      "CREATE TABLE IF NOT EXISTS maps(id INTEGER PRIMARY KEY ASC, id_environment INT, name TEXT, js TEXT, css TEXT)",
    );

    if (extraQueries && extraQueries.length) {
      for (const query of extraQueries) {
        await db.exec(query);
      }
    }
    await db.close();
  };
}
