import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "#app/config/database";

export interface SpaceAttributes {
  id: string;
  projectId: string;
  name: string;
  widthM?: number | null;
  lengthM?: number | null;
  budgetMxn?: number | null;
  style?: string | null;
  notes?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type SpaceCreationAttributes = Optional<
  SpaceAttributes,
  | "id"
  | "widthM"
  | "lengthM"
  | "budgetMxn"
  | "style"
  | "notes"
  | "createdAt"
  | "updatedAt"
>;

export class Space
  extends Model<SpaceAttributes, SpaceCreationAttributes>
  implements SpaceAttributes
{
  declare id: string;
  declare projectId: string;
  declare name: string;
  declare widthM?: number | null;
  declare lengthM?: number | null;
  declare budgetMxn?: number | null;
  declare style?: string | null;
  declare notes?: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Space.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "project_id",
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    widthM: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: "width_m",
    },
    lengthM: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: "length_m",
    },
    budgetMxn: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: "budget_mxn",
    },
    style: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "spaces",
    underscored: true,
  }
);
