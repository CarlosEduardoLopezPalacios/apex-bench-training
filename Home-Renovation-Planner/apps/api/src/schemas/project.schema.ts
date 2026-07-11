import { z } from "zod/v4";
import { emptyRequestPart, uuidSchema } from "#app/schemas/globals";
import type { ProjectDto } from "#app/dtos/project.dto";

const projectParams = z.strictObject({
  projectId: uuidSchema,
});

export const listProjectsSchema = z.strictObject({
  body: emptyRequestPart,
  params: emptyRequestPart,
  query: emptyRequestPart,
});

export const getProjectByIdSchema = z.strictObject({
  body: emptyRequestPart,
  params: projectParams,
  query: emptyRequestPart,
});

export const createProjectSchema = z.strictObject({
  body: z.strictObject({
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
  params: emptyRequestPart,
  query: emptyRequestPart,
});

export const updateProjectSchema = z.strictObject({
  body: z
    .strictObject({
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
  params: projectParams,
  query: emptyRequestPart,
});

export const deleteProjectSchema = z.strictObject({
  body: emptyRequestPart,
  params: projectParams,
  query: emptyRequestPart,
});

export type ListProjectsRequest = z.infer<typeof listProjectsSchema>;
export type GetProjectByIdRequest = z.infer<typeof getProjectByIdSchema>;
export type CreateProjectRequest = z.infer<typeof createProjectSchema>;
export type UpdateProjectRequest = z.infer<typeof updateProjectSchema>;
export type DeleteProjectRequest = z.infer<typeof deleteProjectSchema>;

export interface CreateProjectResponse {
  data: ProjectDto;
}

export interface ListProjectsResponse {
  data: ProjectDto[];
}

export interface GetProjectByIdResponse {
  data: ProjectDto;
}

export interface UpdateProjectResponse {
  data: ProjectDto;
}

export type DeleteProjectResponse = void;
