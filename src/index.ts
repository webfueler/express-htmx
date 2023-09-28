import express from "express";
import path from "node:path";
import { mfeRouter } from "./routes/mfe";
import { webRouter } from "./routes/web";

import { existsSync } from "node:fs";
import { initDatabase } from "./db";

const server = ({ port }: { port: number }) => {
  const publicFolder = path.resolve(path.join(__dirname, "..", "public"));

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(publicFolder));

  app.get("/health-check", async (req, res, next) => {
    res.status(200).send("The API service works fine!");
  });

  if (!existsSync(path.join(publicFolder, "favicon.ico"))) {
    // add middleware to send favicon not found response
    app.use((req, res, next) => {
      if (req.originalUrl.includes("favicon.ico")) {
        return res.status(204).end();
      }
      next();
    });
  }

  app.use("/", webRouter);
  app.use("/api/mfe", mfeRouter);

  const serve = (): void => {
    app
      .listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Listening on port ${port}`);
      })
      .on("error", (error) => {
        throw error;
      });
  };

  return { serve };
};

(async () => {
  // initialize database
  await initDatabase();

  const s = server({ port: 8888 });
  // open server connections
  s.serve();
})();
