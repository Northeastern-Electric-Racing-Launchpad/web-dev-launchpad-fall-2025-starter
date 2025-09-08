import { Prisma } from "@prisma/client";

/**
 * This is a prisma query arg for an experience. It allows us to specify what we want to include in the query.
 * In this case we want to include the creator.
 */
export const experienceQueryArgs =
  Prisma.validator<Prisma.ExperienceDefaultArgs>()({
    include: {
      creator: true,
    },
  });
