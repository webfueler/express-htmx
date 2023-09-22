import { z } from "zod";

export const MfeSchema = z.object({
  name: z
    .string({
      required_error: "'name' is required",
    })
    .trim()
    .min(1, "'name' cannot be empty"),
  url: z
    .string({
      required_error: "'url' is required",
    })
    .url("'url' is not an url"),
  manifest: z.boolean().optional(),
});

export const DeleteMfeSchema = z.object({
  name: z
    .string({
      required_error: "'name' is required",
    })
    .trim()
    .min(1, "'name' cannot be empty"),
});

export const MfeInfoSchema = z.record(
  z.string(),
  z.object({
    jsBundle: z
      .string({
        required_error: "'jsBundle' is required",
      })
      .url("'jsBundle' is not an url"),
    cssBundle: z.string().url("'cssBundle' is not an url").optional(),
  }),
);

export type MfeDto = z.infer<typeof MfeSchema>;
export type DeleteMfeDto = z.infer<typeof DeleteMfeSchema>;
export type MfeInfo = z.infer<typeof MfeInfoSchema>;

export type ApiError = {
  status: "failed";
  error: { path?: string; message?: string }[];
};
