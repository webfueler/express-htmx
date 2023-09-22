import { validate } from "../middlewares/validate";
import { MfeSchema, DeleteMfeSchema } from "./schema";

export const validateMfeCreateOrUpdate = validate(MfeSchema);
export const validateMfeDelete = validate(DeleteMfeSchema);

export const validateMfeFromWebCreateOrUpdate = validate(MfeSchema);
