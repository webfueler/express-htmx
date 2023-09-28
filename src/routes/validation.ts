import type { RequestParamHandler } from "express";
import { MfeModel } from "../models/mfe";

export const validateEnv: RequestParamHandler = async (req, res, next, env) => {
  const allowedEnvs = await MfeModel.getAllEnvs();

  if (allowedEnvs.includes(env)) {
    next();
  } else {
    res.sendStatus(403);
  }
};
