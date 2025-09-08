import { clearDatabase, createTestUser } from "./test.utils";
import ProjectsServices from "../src/services/projects.services";
import { it, describe, beforeEach, expect, expectTypeOf } from "vitest";
// import { Project as SharedProject } from "shared";

describe("Projects Services", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  describe("Create Project", () => {
    it("Create Project should create a project", async () => {
      // TODO: test project creations
    });
  });

  describe("Update Project", () => {
    it("Update Project should update a project", async () => {
      // TODO: test update project
    });

    it("Update Project should throw an error if project not found", async () => {
      // TODO: test update throws not found
    });

    it("Update Project should throw an error if project is deleted", async () => {
      // TODO: test update throws on deleted
    });

    it("Update Project should throw an error if user is not the creator", async () => {
      // TODO: test update project doesn't allow updates from non-creator
    });
  });

  describe("Delete Project", () => {
    it("Delete Project should delete a project", async () => {
      // TODO: test delete project
    });

    it("Delete Project should throw an error if project not found", async () => {
      // TODO: delete project throws if not found
    });

    it("Delete Project should throw an error if project is deleted", async () => {
      // TODO: delete throws on deleted project
    });

    it("Delete Project should throw an error if user is not the creator", async () => {
      // TODO: delete throws when user is not creator
    });
  });

  describe("Get Project By Id", () => {
    it("Get Project By Id should return a project", async () => {
      // TODO: get project by id returns a project
    });

    it("Get Project By Id should throw an error if project not found", async () => {
      // TODO: get project throws if project not found
    });

    it("Get Project By Id should throw an error if project is deleted", async () => {
      // TODO: get project throws if deleted
    });
  });

  describe("Get All Projects", () => {
    it("Get All Projects should return a list of projects", async () => {
      // TODO: get all projects returns all projects
    });

    it("Get All Projects should return an empty list if no projects", async () => {
      // TODO: get all projects returns empty list on no projects
    });

    it("Get all projects should not return deleted projects", async () => {
      // TODO: get all projects doesn't return deleted projects
    });
  });
});
