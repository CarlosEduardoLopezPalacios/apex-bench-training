export interface CreateProjectDto {
  name: string;
  description?: string | null;
  status?: ProjectStatusDto;
  totalBudgetMxn?: string | null;
  currency?: ProjectCurrencyDto;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string | null;
  status?: ProjectStatusDto;
  totalBudgetMxn?: string | null;
  currency?: ProjectCurrencyDto;
}

export type ProjectStatusDto =
  | "planning"
  | "in_progress"
  | "paused"
  | "completed"
  | "cancelled";

export type ProjectCurrencyDto = "MXN";

export interface SpaceSummaryDto {
  id: string;
  projectId: string;
  name: string;
  widthM: number | null;
  lengthM: number | null;
  budgetMxn: string | null;
  style: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDto {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatusDto;
  totalBudgetMxn: string | null;
  currency: ProjectCurrencyDto;
  createdAt: string;
  updatedAt: string;
  spaces?: SpaceSummaryDto[];
}

export function toCreateProjectDto(input: CreateProjectDto): CreateProjectDto {
  return {
    name: input.name,
    ...(input.description !== undefined && {
      description: input.description,
    }),
    ...(input.status !== undefined && { status: input.status }),
    ...(input.totalBudgetMxn !== undefined && {
      totalBudgetMxn: input.totalBudgetMxn,
    }),
    ...(input.currency !== undefined && { currency: input.currency }),
  };
}

export function toUpdateProjectDto(input: UpdateProjectDto): UpdateProjectDto {
  return {
    ...(input.name !== undefined && { name: input.name }),
    ...(input.description !== undefined && {
      description: input.description,
    }),
    ...(input.status !== undefined && { status: input.status }),
    ...(input.totalBudgetMxn !== undefined && {
      totalBudgetMxn: input.totalBudgetMxn,
    }),
    ...(input.currency !== undefined && { currency: input.currency }),
  };
}
