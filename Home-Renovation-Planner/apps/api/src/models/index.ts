import { Project } from "#app/models/project.model";
import { Space } from "#app/models/space.model";
import { AiRecommendation } from "#app/models/ai-recommendation.model";

Project.hasMany(Space, {
  foreignKey: "projectId",
  as: "spaces",
  onDelete: "CASCADE",
});

Space.belongsTo(Project, {
  foreignKey: "projectId",
  as: "project",
});

Project.hasMany(AiRecommendation, {
  foreignKey: "projectId",
  as: "aiRecommendations",
  onDelete: "CASCADE",
});

AiRecommendation.belongsTo(Project, {
  foreignKey: "projectId",
  as: "project",
});

Space.hasMany(AiRecommendation, {
  foreignKey: "spaceId",
  as: "recommendations",
  onDelete: "CASCADE",
});

AiRecommendation.belongsTo(Space, {
  foreignKey: "spaceId",
  as: "space",
});

export { Project, Space, AiRecommendation };
