import { Router } from "express";
import { webController } from "../controllers/web";
import { validateEnv } from "./validation";
import { validateMfeFromWebCreateOrUpdate } from "../models/validator";

const webRouter = Router();

// add validation for env param
webRouter.param("env", validateEnv);

webRouter.route("/").get(webController.home);
webRouter
  .route("/:env")
  .get(webController.get)
  .post(validateMfeFromWebCreateOrUpdate, webController.createOrUpdate);

webRouter.route("/:env/:name").delete(webController.remove);

export { webRouter };
