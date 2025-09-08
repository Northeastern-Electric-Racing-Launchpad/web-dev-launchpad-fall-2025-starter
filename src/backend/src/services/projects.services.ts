import { prisma } from "../prisma/prisma";
import { projectTransformer } from "../transformers/projects.transformer";
// import { Project as SharedProject } from "shared";
import { projectQueryArgs } from "../prisma-query-args/project.query-args";
import { User } from "@prisma/client";
import {
  AccessDeniedException,
  DeletedException,
  NotFoundException,
} from "../utils/error.utils";

export default class ProjectsServices {
  // TODO: get all projects service function

  // TODO: create project service function

  // TODO: update project service function
  
  // TODO: delete project service function

  // TODO: get single project service function
}
