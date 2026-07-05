import { projectsRepository } from "../repositories/projects.repository";
import { HttpError } from "../utils/http-error";
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "../schemas/project.schema";

async function createProject(input: CreateProjectInput) {
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

async function updateProject(projectId: string, input: UpdateProjectInput) {
  const project = await projectsRepository.findById(projectId);

  if (!project) {
    throw new HttpError(404, "Project not found");
  }

  return projectsRepository.update(project, input);
}

async function deleteProject(projectId: string) {
  const project = await projectsRepository.findById(projectId);

  if (!project) {
    throw new HttpError(404, "Project not found");
  }

  await projectsRepository.remove(project);
}

export const projectsService = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};