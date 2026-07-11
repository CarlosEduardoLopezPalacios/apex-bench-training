import { projectsRepository } from "#app/repositories/projects.repository";
import { HttpError } from "#app/utils/http-error";
import type {
  CreateProjectDto,
  UpdateProjectDto,
} from "#app/dtos/project.dto";

async function createProject(input: CreateProjectDto) {
  return projectsRepository.create(input);
}

async function getProjects() {
  return projectsRepository.findAll();
}

async function getProjectById(projectId: string) {
  const project = await projectsRepository.findById(projectId);

  if (!project) {
    throw new HttpError(404, "Project not found");
  }

  return project;
}

async function updateProject(projectId: string, input: UpdateProjectDto) {
  const project = await projectsRepository.updateById(projectId, input);

  if (!project) {
    throw new HttpError(404, "Project not found");
  }

  return project;
}

async function deleteProject(projectId: string) {
  const deleted = await projectsRepository.removeById(projectId);

  if (!deleted) {
    throw new HttpError(404, "Project not found");
  }
}

export const projectsService = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
