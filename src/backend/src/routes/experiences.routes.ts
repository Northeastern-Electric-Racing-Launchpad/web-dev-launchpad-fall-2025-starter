import express from "express";
import ExperiencesController from "../controllers/experiences.controller";
import {
  isDate,
  nonEmptyString,
  validateInputs,
} from "../utils/validation.utils";
import { body } from "express-validator";

const experiencesRouter = express.Router();

experiencesRouter.get("/", ExperiencesController.getAllExperiences);
experiencesRouter.post(
  "/new",
  body("images").isArray(),
  nonEmptyString(body("images.*")),
  nonEmptyString(body("title")),
  nonEmptyString(body("description")),
  nonEmptyString(body("companyName")),
  nonEmptyString(body("location")),
  isDate(body("startDate")),
  body("endDate").optional(),
  validateInputs,
  ExperiencesController.createExperience
);
experiencesRouter.post(
  "/:id",
  body("images").isArray(),
  nonEmptyString(body("images.*")),
  nonEmptyString(body("description")),
  nonEmptyString(body("companyName")),
  nonEmptyString(body("location")),
  isDate(body("startDate")),
  body("endDate").optional(),
  validateInputs,
  ExperiencesController.updateExperience
);

experiencesRouter.delete("/:id", ExperiencesController.deleteExperience);

export default experiencesRouter;
