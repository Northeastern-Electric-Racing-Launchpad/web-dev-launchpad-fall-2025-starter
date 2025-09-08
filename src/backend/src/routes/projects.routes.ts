import express from "express";
import ProjectsController from "../controllers/projects.controller";
import { nonEmptyString, validateInputs } from "../utils/validation.utils";
import { body } from "express-validator";
import { upload } from "../utils/file.utils";

const projectsRouter = express.Router();

// TODO: get all projects at "/"

// TODO: make new project at "/new"

// TODO: update project at "/:id"

// TODO: delete project at "/:id"

export default projectsRouter;
