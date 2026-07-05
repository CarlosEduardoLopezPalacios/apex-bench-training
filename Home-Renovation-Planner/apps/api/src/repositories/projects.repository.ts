import { Project, Space } from "../models";
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "../schemas/project.schema";

async function create(input: CreateProjectInput) {
  return Project.create(input);
}

async function findAll() {
  return Project.findAll({
    include: [
      {
        model: Space,
        as: "spaces",
      },
    ],
    order: [["createdAt", "DESC"]],
  });
}

async function findById(projectId: string) {
  return Project.findByPk(projectId, {
    include: [
      {
        model: Space,
        as: "spaces",
      },
    ],
  });
}

async function update(project: Project, input: UpdateProjectInput) {
  return project.update(input);
}

async function remove(project: Project) {
  await project.destroy();
}

export const projectsRepository = {
  create,
  findAll,
  findById,
  update,
  remove,
};