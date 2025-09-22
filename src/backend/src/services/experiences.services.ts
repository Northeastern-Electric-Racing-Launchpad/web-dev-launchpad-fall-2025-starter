import { User } from "@prisma/client";
import { Experience } from "shared";
import { prisma } from "../prisma/prisma";
import { experienceQueryArgs } from "../prisma-query-args/experiences.query-args";
import { experienceTransformer } from "../transformers/experiences.transformer";
import {
  AccessDeniedException,
  DeletedException,
  NotFoundException,
} from "../utils/error.utils";

export default class ExperiencesService {
  static async getAllExperiences(): Promise<Experience[]> {
    const experiences = await prisma.experience.findMany({
      where: { deletedAt: null },
      ...experienceQueryArgs,
    });

    return experiences.map(experienceTransformer);
  }

  static async createExperience(
    title: string,
    description: string,
    companyName: string,
    location: string,
    submitter: User,
    imageUrls: string[],
    startDate: Date,
    endDate?: Date
  ): Promise<Experience> {
    const createdExperience = await prisma.experience.create({
      data: {
        title,
        description,
        companyName,
        location,
        startDate,
        endDate: endDate ? endDate : null,
        creatorId: submitter.id,
        imageUrls,
      },
      ...experienceQueryArgs,
    });

    return experienceTransformer(createdExperience);
  }

  static async updateExperience(
    id: string,
    title: string,
    description: string,
    companyName: string,
    location: string,
    submitter: User,
    imageUrls: string[],
    startDate: Date,
    endDate?: Date
  ): Promise<Experience> {
    const oldExperience = await prisma.experience.findUnique({
      where: {
        id,
      },
    });
    if (!oldExperience) throw new NotFoundException("Experience", id);
    if (oldExperience.deletedAt) throw new DeletedException("Experience", id);
    if (oldExperience.creatorId !== submitter.id)
      throw new AccessDeniedException(
        "You can't update someone else's experience"
      );

    const updatedExperience = await prisma.experience.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        companyName,
        location,
        startDate,
        endDate: endDate ? endDate : null,
        imageUrls,
      },
      ...experienceQueryArgs,
    });

    return experienceTransformer(updatedExperience);
  }

  static async deleteExperience(
    id: string,
    submitter: User
  ): Promise<Experience> {
    const experience = await prisma.experience.findUnique({
      where: {
        id,
      },
    });
    if (!experience) throw new NotFoundException("Experience", id);

    if (experience.deletedAt) throw new DeletedException("Experience", id);

    if (experience.creatorId !== submitter.id)
      throw new AccessDeniedException(
        "You can't delete someone else's experience"
      );

    const deletedExperience = await prisma.experience.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        deleterId: submitter.id,
      },
      ...experienceQueryArgs,
    });

    return experienceTransformer(deletedExperience);
  }

  static async getExperienceById(id: string): Promise<Experience> {
    const experience = await prisma.experience.findUnique({
      where: {
        id,
      },
      ...experienceQueryArgs,
    });

    if (!experience) throw new NotFoundException("Experience", id);
    if (experience.deletedAt) throw new DeletedException("Experience", id);

    return experienceTransformer(experience);
  }
}
