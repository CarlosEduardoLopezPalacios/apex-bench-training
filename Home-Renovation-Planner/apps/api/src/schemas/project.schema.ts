import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Project name is required")
      .max(120, "Project name is too long"),
    description: z
      .string()
      .trim()
      .max(1000, "Description is too long")
      .optional()
      .nullable(),
  }),
});

export const updateProjectSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(1, "Project name is required")
        .max(120, "Project name is too long")
        .optional(),
      description: z
        .string()
        .trim()
        .max(1000, "Description is too long")
        .optional()
        .nullable(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is required",
    }),
});

export type CreateProjectInput = z.infer<
  typeof createProjectSchema
>["body"];

export type UpdateProjectInput = z.infer<
  typeof updateProjectSchema
>["body"];