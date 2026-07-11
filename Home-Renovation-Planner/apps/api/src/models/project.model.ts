import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "#app/config/database";

export interface ProjectAttributes {
  id: string;
  name: string;
  description?: string | null;
  status: ProjectStatus;
  totalBudgetMxn?: string | null;
  currency: ProjectCurrency;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProjectStatus =
  | "planning"
  | "in_progress"
  | "paused"
  | "completed"
  | "cancelled";

export type ProjectCurrency = "MXN";

type ProjectCreationAttributes = Optional<
  ProjectAttributes,
  | "id"
  | "description"
  | "status"
  | "totalBudgetMxn"
  | "currency"
  | "createdAt"
  | "updatedAt"
>;

export class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  declare id: string;
  declare name: string;
  declare description?: string | null;
  declare status: ProjectStatus;
  declare totalBudgetMxn?: string | null;
  declare currency: ProjectCurrency;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        "planning",
        "in_progress",
        "paused",
        "completed",
        "cancelled"
      ),
      allowNull: false,
      defaultValue: "planning",
    },
    totalBudgetMxn: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: true,
      field: "total_budget_mxn",
    },
    currency: {
      type: DataTypes.ENUM("MXN"),
      allowNull: false,
      defaultValue: "MXN",
    },
  },
  {
    sequelize,
    tableName: "projects",
    underscored: true,
  }
);
