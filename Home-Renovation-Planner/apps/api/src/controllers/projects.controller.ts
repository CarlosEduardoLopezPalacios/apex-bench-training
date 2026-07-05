import type { Request, Response } from "express";
import { asyncHandler } from "../middleware/async-handler";
import { projectsService } from "../services/projects.services";

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await projectsService.createProject(req.body);

    res.status(201).json({
      data: project,
    });
  }
);

export const getProjects = asyncHandler(
  async (_req: Request, res: Response) => {
    const projects = await projectsService.getProjects();

    res.json({
      data: projects,
    });
  }
);

export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await projectsService.getProjectById(req.params.projectId as string);

    res.json({
      data: project,
    });
  }
);

export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await projectsService.updateProject(
      req.params.projectId as string,
      req.body
    );

    res.json({
      data: project,
    });
  }
);

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    await projectsService.deleteProject(req.params.projectId as string);

    res.status(204).send();
  }
);