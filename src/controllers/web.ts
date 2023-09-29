import { RequestHandler } from "express";
import { MfeModel } from "../models/mfe";
import { HomePage } from "../views/pages/Home";
import { ListPage } from "../views/pages/List";
import { List } from "../views/components/List";
import { DangerAlert } from "../views/components/Alert";

type ErrorHandler = (
  req: Parameters<RequestHandler>["0"],
  res: Parameters<RequestHandler>["1"],
  err: unknown,
) => void;

const handleControllerError: ErrorHandler = async (req, res, err) => {
  const error = err instanceof Error ? err.message : String(err);
  const mfeList = await MfeModel.getAll(req.params.env);
  res
    .status(200)
    .send(List(req.params.env, mfeList, DangerAlert("Error", error)));
};

const home: RequestHandler = async (req, res, next) => {
  try {
    const allowedEnvs = await MfeModel.getAllEnvs();
    res.status(200).send(HomePage(req.originalUrl, allowedEnvs));
  } catch (err) {
    handleControllerError(req, res, err);
  }
};

const get: RequestHandler = async (req, res, next) => {
  try {
    const mfeList = await MfeModel.getAll(req.params.env);
    const allowedEnvs = await MfeModel.getAllEnvs();
    res
      .status(200)
      .send(ListPage(req.originalUrl, allowedEnvs, req.params.env, mfeList));
  } catch (err) {
    handleControllerError(req, res, err);
  }
};

const createOrUpdate: RequestHandler = async (req, res, next) => {
  try {
    const env = req.params.env;
    await MfeModel.createOrUpdate(env, req.body);

    const mfeList = await MfeModel.getAll(env);
    res.status(200).send(List(env, mfeList));
  } catch (err) {
    handleControllerError(req, res, err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const env = req.params.env;
    const name = decodeURIComponent(req.params.name);
    await MfeModel.remove(env, { name });

    const mfeList = await MfeModel.getAll(env);
    res.status(200).send(List(env, mfeList));
  } catch (err) {
    handleControllerError(req, res, err);
  }
};

export const webController = {
  get,
  home,
  remove,
  createOrUpdate,
};
