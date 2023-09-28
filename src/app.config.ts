import { join } from "node:path";

// default database file
const DB_FILE = join(__dirname, "..", "db", "registry.db");

// defining as constant while we don't have endpoints for these
// they are added to database upon initialization
const ENVIRONMENTS = ["development", "sandbox", "production"];

export { DB_FILE, ENVIRONMENTS };
