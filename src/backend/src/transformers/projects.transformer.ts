import { Prisma, Project } from "@prisma/client";
// import { ProjectPreview, Project as SharedProject } from "shared";
import { projectQueryArgs } from "../prisma-query-args/project.query-args";
import { userPreviewTransformer } from "./users.transformer";

export const projectTransformer = (
  project: Prisma.ProjectGetPayload<typeof projectQueryArgs>
): /**SharedProject*/ void => {
  // TODO: Project transformer
};

export const projectPreviewTransformer = (project: Project): /**ProjectPreview*/ void => {
  // TODO: Project Preview Transformer
};
