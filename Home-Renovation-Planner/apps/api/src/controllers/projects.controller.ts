import type { Request, Response } from "express";
import { asyncHandler } from "#app/middleware/async-handler";
import { projectsService } from "#app/services/projects.services";
import type {
  CreateProjectRequest,
  CreateProjectResponse,
  DeleteProjectRequest,
  DeleteProjectResponse,
  GetProjectByIdRequest,
  GetProjectByIdResponse,
  ListProjectsRequest,
  ListProjectsResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from "#app/schemas/project.schema";
import type { ValidatedResponse } from "#app/schemas/globals";
import {
  toCreateProjectDto,
  toUpdateProjectDto,
} from "#app/dtos/project.dto";

export const createProject = asyncHandler(
  async (
    _req: Request,
    res: ValidatedResponse<CreateProjectRequest, CreateProjectResponse>
  ) => {
    const input = toCreateProjectDto(res.locals.validated.body);
    const project = await projectsService.createProject(input);

    res.status(201).json({
      data: project,
    });
  }
);

export const getProjects = asyncHandler(
  async (
    _req: Request,
    res: ValidatedResponse<ListProjectsRequest, ListProjectsResponse>
  ) => {
    const projects = await projectsService.getProjects();

    res.json({
      data: projects,
    });
  }
);

export const getProjectById = asyncHandler(
  async (
    _req: Request,
    res: ValidatedResponse<GetProjectByIdRequest, GetProjectByIdResponse>
  ) => {
    const project = await projectsService.getProjectById(
      res.locals.validated.params.projectId
    );

    res.json({
      data: project,
    });
  }
);

export const updateProject = asyncHandler(
  async (
    _req: Request,
    res: ValidatedResponse<UpdateProjectRequest, UpdateProjectResponse>
  ) => {
    const { body, params } = res.locals.validated;
    const input = toUpdateProjectDto(body);
    const project = await projectsService.updateProject(
      params.projectId,
      input
    );

    res.json({
      data: project,
    });
  }
);

export const deleteProject = asyncHandler(
  async (
    _req: Request,
    res: ValidatedResponse<DeleteProjectRequest, DeleteProjectResponse>
  ) => {
    await projectsService.deleteProject(res.locals.validated.params.projectId);

    res.status(204).send();
  }
);
