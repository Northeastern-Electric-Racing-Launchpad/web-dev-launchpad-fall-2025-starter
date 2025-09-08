import { Prisma, User } from "@prisma/client";
import { Role, UserPreview } from "shared";
import { userQueryArgs } from "../prisma-query-args/users.query-args";
import { User as SharedUser } from "shared";
import { experiencePreviewTransformer } from "./experiences.transformer";
import { projectPreviewTransformer } from "./projects.transformer";

export const userPreviewTransformer = (user: User): UserPreview => {
  return {
    ...user,
    role: user.role as Role,
  };
};

export const userTransformer = (
  user: Prisma.UserGetPayload<typeof userQueryArgs>
): SharedUser => {
  return {
    ...user,
    role: user.role as Role,
    // TODO: include projects
    experiences: user.createdExperiences.map(experiencePreviewTransformer),
  };
};
