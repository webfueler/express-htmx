import type { RequestParamHandler } from "express";
import { ALLOWED_ENVS } from "./constants";

export const validateEnv: RequestParamHandler = (req, res, next, env) => {
  if (ALLOWED_ENVS.includes(env)) {
    next();
  } else {
    res.sendStatus(403);
  }
};
