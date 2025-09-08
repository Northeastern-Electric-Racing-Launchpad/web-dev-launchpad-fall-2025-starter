import { Prisma } from "@prisma/client";

/**
 * This is a prisma query arg for a user. It allows us to specify what we want to include in the query.
 * In this case we want to include the createdExperiences and createdProjects. We also want to exclude any
 * soft-deleted experiences and projects.
 */
export const userQueryArgs = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    createdExperiences: { where: { deletedAt: null } }, // Excludes soft-deleted experiences
    // TODO: include created projects
  },
});
