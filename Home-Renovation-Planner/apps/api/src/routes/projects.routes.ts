import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "#app/controllers/projects.controller";
import { validateRequest } from "#app/middleware/validate-request";
import {
  createProjectSchema,
  deleteProjectSchema,
  getProjectByIdSchema,
  listProjectsSchema,
  updateProjectSchema,
} from "#app/schemas/project.schema";

export const projectRoutes = Router();

projectRoutes.get("/", validateRequest(listProjectsSchema), getProjects);

projectRoutes.get(
  "/:projectId",
  validateRequest(getProjectByIdSchema),
  getProjectById
);

projectRoutes.post(
  "/",
  validateRequest(createProjectSchema),
  createProject
);

projectRoutes.patch(
  "/:projectId",
  validateRequest(updateProjectSchema),
  updateProject
);

projectRoutes.delete(
  "/:projectId",
  validateRequest(deleteProjectSchema),
  deleteProject
);
