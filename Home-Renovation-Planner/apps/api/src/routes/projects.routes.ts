import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controllers/projects.controller";
import { validateRequest } from "../middleware/validate-request";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema";

export const projectRoutes = Router();

projectRoutes.get("/", getProjects);

projectRoutes.get("/:projectId", getProjectById);

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

projectRoutes.delete("/:projectId", deleteProject);