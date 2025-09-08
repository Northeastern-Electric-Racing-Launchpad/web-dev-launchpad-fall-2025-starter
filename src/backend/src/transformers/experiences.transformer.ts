import { Prisma } from "@prisma/client";
import { userPreviewTransformer } from "./users.transformer";
import { experienceQueryArgs } from "../prisma-query-args/experiences.query-args";
import { ExperiencePreview, Experience as SharedExperience } from "shared";
import { Experience } from "@prisma/client";

export const experienceTransformer = (
  experience: Prisma.ExperienceGetPayload<typeof experienceQueryArgs>
): SharedExperience => {
  return {
    ...experience,
    creator: userPreviewTransformer(experience.creator),
    isCurrentRole: experience.endDate === null,
    endDate: experience.endDate ?? undefined,
  };
};

export const experiencePreviewTransformer = (
  experience: Experience
): ExperiencePreview => {
  return {
    ...experience,
    isCurrentRole: experience.endDate === null,
    endDate: experience.endDate ?? undefined,
  };
};
