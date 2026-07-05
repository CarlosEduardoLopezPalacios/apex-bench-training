import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database";

export type AiRecommendationType =
  | "design_plan"
  | "budget_estimate"
  | "materials_list"
  | "task_breakdown"
  | "risk_analysis"
  | "style_suggestion"
  | "general";

export type AiRecommendationProvider =
  | "openai"
  | "anthropic"
  | "google"
  | "other";

export type AiRecommendationStatus =
  | "pending"
  | "completed"
  | "failed";

export interface AiRecommendationAttributes {
  id: string;
  projectId: string;
  spaceId?: string | null;
  type: AiRecommendationType;
  inputSnapshot: object;
  prompt: string;
  response?: object | null;
  summary?: string | null;
  model?: string | null;
  provider: AiRecommendationProvider;
  status: AiRecommendationStatus;
  errorMessage?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type AiRecommendationCreationAttributes = Optional<
  AiRecommendationAttributes,
  | "id"
  | "spaceId"
  | "response"
  | "summary"
  | "model"
  | "errorMessage"
  | "createdAt"
  | "updatedAt"
>;

export class AiRecommendation
  extends Model<
    AiRecommendationAttributes,
    AiRecommendationCreationAttributes
  >
  implements AiRecommendationAttributes
{
  declare id: string;
  declare projectId: string;
  declare spaceId?: string | null;
  declare type: AiRecommendationType;
  declare inputSnapshot: object;
  declare prompt: string;
  declare response?: object | null;
  declare summary?: string | null;
  declare model?: string | null;
  declare provider: AiRecommendationProvider;
  declare status: AiRecommendationStatus;
  declare errorMessage?: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

AiRecommendation.init(
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
    spaceId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "space_id",
    },
    type: {
      type: DataTypes.ENUM(
        "design_plan",
        "budget_estimate",
        "materials_list",
        "task_breakdown",
        "risk_analysis",
        "style_suggestion",
        "general"
      ),
      allowNull: false,
      defaultValue: "general",
    },
    inputSnapshot: {
      type: DataTypes.JSONB,
      allowNull: false,
      field: "input_snapshot",
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    response: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    model: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    provider: {
      type: DataTypes.ENUM("openai", "anthropic", "google", "other"),
      allowNull: false,
      defaultValue: "openai",
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "error_message",
    },
  },
  {
    sequelize,
    tableName: "ai_recommendations",
    underscored: true,
  }
);