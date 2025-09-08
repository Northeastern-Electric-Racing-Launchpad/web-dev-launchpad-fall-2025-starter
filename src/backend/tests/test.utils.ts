import { Role, User } from "@prisma/client";
import { prisma } from "../src/prisma/prisma";

export interface TestUserProps {
  email: string;
  password: string;
  username: string;
  role: Role;
}

export const clearDatabase = async () => {
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.user.deleteMany();
};

export const createTestUser = async (
  overrides: TestUserProps = {
    email: "test.user@gmail.com",
    password: "password",
    username: "testuser",
    role: "USER",
  }
) => {
  const user = await prisma.user.create({
    data: {
      ...overrides,
    },
  });
  return user;
};

export const createTestProject = async (creator?: User) => {
  const id = creator?.id ?? (await createTestUser()).id;
  const project = await prisma.project.create({
    data: {
      title: "Test Project",
      description: "Test Description",
      url: "https://test.com",
      creatorId: id,
    },
  });
  return project;
};

export const createTestExperience = async (creator?: User) => {
  const id = creator?.id ?? (await createTestUser()).id;
  const experience = await prisma.experience.create({
    data: {
      title: "Test Experience",
      description: "Test Description",
      companyName: "Test Company",
      location: "Test Location",
      startDate: new Date(),
      creatorId: id,
    },
  });

  return experience;
};
