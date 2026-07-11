import { Project, Space } from "#app/models/index";
import type { ProjectAttributes } from "#app/models/project.model";
import type { SpaceAttributes } from "#app/models/space.model";
import type {
  CreateProjectDto,
  ProjectDto,
  SpaceSummaryDto,
  UpdateProjectDto,
} from "#app/dtos/project.dto";

type ProjectWithSpaces = ProjectAttributes & {
  spaces?: SpaceAttributes[];
};

function toSpaceSummaryDto(space: SpaceAttributes): SpaceSummaryDto {
  return {
    id: space.id,
    projectId: space.projectId,
    name: space.name,
    widthM: space.widthM ?? null,
    lengthM: space.lengthM ?? null,
    budgetMxn: space.budgetMxn ?? null,
    style: space.style ?? null,
    notes: space.notes ?? null,
    createdAt: space.createdAt as Date,
    updatedAt: space.updatedAt as Date,
  };
}

function toProjectDto(project: Project): ProjectDto {
  const plainProject = project.get({ plain: true }) as ProjectWithSpaces;

  return {
    id: plainProject.id,
    name: plainProject.name,
    description: plainProject.description ?? null,
    createdAt: plainProject.createdAt as Date,
    updatedAt: plainProject.updatedAt as Date,
    ...(plainProject.spaces && {
      spaces: plainProject.spaces.map(toSpaceSummaryDto),
    }),
  };
}

async function create(input: CreateProjectDto) {
  const project = await Project.create(input);

  return toProjectDto(project);
}

async function findAll() {
  const projects = await Project.findAll({
    include: [
      {
        model: Space,
        as: "spaces",
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return projects.map(toProjectDto);
}

async function findById(projectId: string) {
  const project = await Project.findByPk(projectId, {
    include: [
      {
        model: Space,
        as: "spaces",
      },
    ],
  });

  return project ? toProjectDto(project) : null;
}

async function updateById(projectId: string, input: UpdateProjectDto) {
  const project = await Project.findByPk(projectId);

  if (!project) {
    return null;
  }

  await project.update(input);

  return toProjectDto(project);
}

async function removeById(projectId: string) {
  const project = await Project.findByPk(projectId);

  if (!project) {
    return false;
  }

  await project.destroy();

  return true;
}

export const projectsRepository = {
  create,
  findAll,
  findById,
  updateById,
  removeById,
};
