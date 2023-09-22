import { Router } from "express";
import { mfeController } from "../controllers/mfe";
import {
  validateMfeCreateOrUpdate,
  validateMfeDelete,
} from "../models/validator";
import { validateEnv } from "./validation";

const mfeRouter = Router();

mfeRouter
  .route("/:env")
  .get(mfeController.getAll)
  .post(validateMfeCreateOrUpdate, mfeController.createOrUpdate)
  .delete(validateMfeDelete, mfeController.remove);

mfeRouter.param("env", validateEnv);

export { mfeRouter };
