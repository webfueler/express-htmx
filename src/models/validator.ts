import { validate } from "../middlewares/validate";
import { MfeSchema, MfeWebSchema, DeleteMfeSchema } from "./schema";

export const validateMfeCreateOrUpdate = validate(MfeSchema);
export const validateMfeDelete = validate(DeleteMfeSchema);

export const validateMfeFromWebCreateOrUpdate = validate(MfeWebSchema);
