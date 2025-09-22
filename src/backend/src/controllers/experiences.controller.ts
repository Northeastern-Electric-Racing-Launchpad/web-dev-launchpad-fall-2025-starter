import { NextFunction, Request, Response } from "express";
import { getCurrentUser } from "../utils/auth.utils";
import ExperiencesService from "../services/experiences.services";

export default class ExperiencesController {
  static async getAllExperiences(
    _req: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const experiences = await ExperiencesService.getAllExperiences();
      response.status(200).json(experiences);
    } catch (error) {
      next(error);
    }
  }

  static async createExperience(
    req: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const {
        title,
        description,
        companyName,
        location,
        startDate,
        endDate,
        images,
      } = req.body;
      const submitter = await getCurrentUser(response);

      const createdExperience = await ExperiencesService.createExperience(
        title,
        description,
        companyName,
        location,
        submitter,
        images,
        startDate,
        endDate
      );

      response.status(200).json(createdExperience);
    } catch (error) {
      next(error);
    }
  }

  static async updateExperience(
    req: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { title, description, companyName, location, startDate, endDate } =
        req.body;
      const submitter = await getCurrentUser(response);
      const files = req.files as Express.Multer.File[];
      const updatedExperience = await ExperiencesService.updateExperience(
        id,
        title,
        description,
        companyName,
        location,
        submitter,
        files.map((file) => file.path),
        startDate,
        endDate
      );

      response.status(200).json(updatedExperience);
    } catch (error) {
      next(error);
    }
  }

  static async deleteExperience(
    req: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const submitter = await getCurrentUser(response);

      await ExperiencesService.deleteExperience(id, submitter);

      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async getExperienceById(
    req: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const experience = await ExperiencesService.getExperienceById(id);
      response.status(200).json(experience);
    } catch (error) {
      next(error);
    }
  }
}
