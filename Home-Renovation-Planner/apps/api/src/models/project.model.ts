import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface ProjectAttributes {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProjectCreationAttributes = Optional<
  ProjectAttributes,
  "id" | "description" | "createdAt" | "updatedAt"
>;

export class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  declare id: string;
  declare name: string;
  declare description?: string | null;
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
  },
  {
    sequelize,
    tableName: "projects",
    underscored: true,
  }
);