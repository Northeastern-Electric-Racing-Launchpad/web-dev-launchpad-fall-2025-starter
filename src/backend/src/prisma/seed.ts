import ExperiencesService from "../services/experiences.services";
import ProjectsServices from "../services/projects.services";
import { prisma } from "./prisma";

const performSeed = async () => {
  const admin = await prisma.user.create({
    data: {
      email: "joe@northeastern.edu",
      password: "admin",
      role: "ADMIN",
      username: "admin",
      imageUrl: "uploads/1718843466958-profilepic.jpeg",
      title: "Software Engineer",
      bio: "I am a software engineer",
      githubLink: "https://github.com/Peyton-McKee",
      linkedInLink:
        "https://www.linkedin.com/in/peyton-mckee/details/experience/",
    },
  });

  const experience = await ExperiencesService.createExperience(
    "Software Engineer",
    "Worked as a software engineer",
    "Google",
    "Mountain View, CA",
    admin,
    [],
    new Date("2020-01-01"),
    undefined
  );

  // TODO: Project Seed Data
};

performSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
