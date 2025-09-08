import { ExperiencePreview } from "./experiences.types";
// import { ProjectPreview } from "./project.types";

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
  // projects: ProjectPreview[];
  experiences: ExperiencePreview[];
  imageUrl: string;
  title: string;
  bio: string;
  githubLink: string;
  linkedInLink: string;
}

export type UserPreview = Omit<User, "projects" | "experiences">;

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
