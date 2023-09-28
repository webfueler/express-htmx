import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { MfeModel } from "../models/mfe";
import { DangerAlert } from "../views/components/Alert";
import { List } from "../views/components/List";

type ValidationError =
  | {
      status: "ok";
    }
  | {
      status: "failed";
      error: {
        message: string;
      }[];
    };

export interface SchemaValidation {
  schemaValidation?: ValidationError;
}

/**
 * Validates request body and changes request object with new information
 * @param schema - schema to validate from request body
 * @returns - request with {@link SchemaValidation}
 */
export const validate =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (
    req: Request & SchemaValidation,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await schema.parseAsync(req.body);
      req.schemaValidation = {
        status: "ok",
      };
      next();
    } catch (error) {
      let err: Array<{
        message: string;
      }> = [];

      if (error instanceof z.ZodError) {
        err = error.issues.map((e) => ({
          message: e.message,
        }));
      }

      req.schemaValidation = {
        status: "failed",
        error: err,
      };
      next();
    }
  };

/**
 * Handles validation of request body
 * @returns json response
 */
export const handleApiValidation =
  () =>
  async (
    req: Request & SchemaValidation,
    res: Response,
    next: NextFunction,
  ) => {
    if (req.schemaValidation && req.schemaValidation.status === "failed") {
      return res.status(409).json(req.schemaValidation);
    }
    next();
  };

/**
 * Handles validation of request body
 * @returns html response
 */
export const handleWebValidation =
  () =>
  async (
    req: Request & SchemaValidation,
    res: Response,
    next: NextFunction,
  ) => {
    if (req.schemaValidation && req.schemaValidation.status === "failed") {
      try {
        const mfeList = await MfeModel.getAll(req.params.env);
        return res
          .status(200)
          .send(
            List(
              req.params.env,
              mfeList,
              DangerAlert(
                "Error",
                req.schemaValidation.error
                  .map((err) => err.message)
                  .join("<br />"),
              ),
            ),
          );
      } catch (err) {
        next(err);
      }
    }
    next();
  };
