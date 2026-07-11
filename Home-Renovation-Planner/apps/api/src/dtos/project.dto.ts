export interface CreateProjectDto {
  name: string;
  description?: string | null;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string | null;
}

export interface SpaceSummaryDto {
  id: string;
  projectId: string;
  name: string;
  widthM: number | null;
  lengthM: number | null;
  budgetMxn: number | null;
  style: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectDto {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  spaces?: SpaceSummaryDto[];
}

export function toCreateProjectDto(input: CreateProjectDto): CreateProjectDto {
  return {
    name: input.name,
    ...(input.description !== undefined && {
      description: input.description,
    }),
  };
}

export function toUpdateProjectDto(input: UpdateProjectDto): UpdateProjectDto {
  return {
    ...(input.name !== undefined && { name: input.name }),
    ...(input.description !== undefined && {
      description: input.description,
    }),
  };
}
