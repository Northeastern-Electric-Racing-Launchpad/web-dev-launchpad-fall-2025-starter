import express from "express";
import ExperiencesController from "../controllers/experiences.controller";
import {
  isDate,
  nonEmptyString,
  validateInputs,
} from "../utils/validation.utils";
import { body } from "express-validator";
import { upload } from "../utils/file.utils";

const experiencesRouter = express.Router();

experiencesRouter.get("/", ExperiencesController.getAllExperiences);
experiencesRouter.post(
  "/new",
  upload.array("images"),
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
  upload.array("images"),
  nonEmptyString(body("title")),
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
