import express from "express";
import path from "node:path";
import { mfeRouter } from "./routes/mfe";
import { webRouter } from "./routes/web";
import cors from "cors";

const server = ({ port }: { port: number }) => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.resolve(path.join(__dirname, "..", "public"))));

  app.get("/health-check", async (req, res, next) => {
    res.status(200).send("The API service works fine!");
  });

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

const s = server({ port: 8888 });
s.serve();
