import { Router } from "express";
import { mfeController } from "../controllers/mfe";
import {
  validateMfeCreateOrUpdate,
  validateMfeDelete,
} from "../models/validator";
import { validateEnv } from "./validation";
import { handleApiValidation } from "../middlewares/validate";

const mfeRouter = Router();

mfeRouter
  .route("/:env")
  .get(mfeController.getAll)
  .post(
    validateMfeCreateOrUpdate,
    handleApiValidation(),
    mfeController.createOrUpdate,
  )
  .delete(validateMfeDelete, handleApiValidation(), mfeController.remove);

mfeRouter.param("env", validateEnv);

export { mfeRouter };
