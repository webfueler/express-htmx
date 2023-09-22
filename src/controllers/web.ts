import { RequestHandler } from "express";
import { MfeModel } from "../models/mfe";
import { HomePage } from "../views/pages/Home";
import { ListPage } from "../views/pages/List";
import { ALLOWED_ENVS } from "../routes/constants";
import { List } from "../views/components/List";

const home: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).send(HomePage(req.originalUrl, ALLOWED_ENVS));
  } catch (err) {
    next(err);
  }
};

const get: RequestHandler = async (req, res, next) => {
  try {
    const mfeList = await MfeModel.getAll(req.params.env);
    res
      .status(200)
      .send(ListPage(req.originalUrl, ALLOWED_ENVS, req.params.env, mfeList));
  } catch (err) {
    next(err);
  }
};

const createOrUpdate: RequestHandler = async (req, res, next) => {
  try {
    const env = req.params.env;
    await MfeModel.createOrUpdate(env, req.body);

    const mfeList = await MfeModel.getAll(env);
    res.status(200).send(List(env, mfeList));
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const env = req.params.env;
    const name = req.params.name;
    await MfeModel.remove(env, { name });

    const mfeList = await MfeModel.getAll(env);
    res.status(200).send(List(env, mfeList));
  } catch (err) {
    next(err);
  }
};

export const webController = {
  get,
  home,
  remove,
  createOrUpdate,
};
