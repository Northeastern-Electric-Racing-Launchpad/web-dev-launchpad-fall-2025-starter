import { User } from "shared";
// import { projectPreviewTransformer } from "./projects.transformer";
import { experiencePreviewTransformer } from "./experiences.transformer";

export const userTransformer = (user: User): User => {
  return {
    ...user,
    //TODO: add transformer for projects
    experiences: user.experiences.map(experiencePreviewTransformer),
  };
};
