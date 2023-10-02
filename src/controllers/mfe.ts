import { RequestHandler } from "express";
import { MfeModel } from "../models/mfe";

type ErrorHandler = (
  req: Parameters<RequestHandler>["0"],
  res: Parameters<RequestHandler>["1"],
  err: unknown,
) => void;

const handleControllerError: ErrorHandler = async (req, res, err) => {
  return res.status(202).json({
    status: "failed",
    error: [
      {
        message: err instanceof Error && err.message,
      },
    ],
  });
};

const getAll: RequestHandler = async (req, res, next) => {
  try {
    const mfeList = await MfeModel.getAll(req.params.env);
    res.status(200).json(mfeList);
  } catch (err) {
    handleControllerError(req, res, err);
  }
};

const createOrUpdate: RequestHandler = async (req, res, next) => {
  try {
    const mfe = await MfeModel.createOrUpdate(req.params.env, req.body);
    res.status(201).json(mfe);
  } catch (err) {
    handleControllerError(req, res, err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const result = await MfeModel.remove(req.params.env, req.body);
    if (Object.keys(result).length === 0 && result.constructor === Object) {
      // deleted
      res.status(204).json(result);
    } else {
      // error
      res.status(200).json(result);
    }
  } catch (err) {
    handleControllerError(req, res, err);
  }
};

export const mfeController = {
  getAll,
  createOrUpdate,
  remove,
};
