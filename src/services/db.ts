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

  get isOpen(): boolean {
    return this.db !== undefined;
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
}
