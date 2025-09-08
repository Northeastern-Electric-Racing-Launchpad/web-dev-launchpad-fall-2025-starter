import { describe, expect, expectTypeOf, it, beforeEach } from "vitest";
import { clearDatabase, createTestUser } from "./test.utils";
import ExperiencesService from "../src/services/experiences.services";
import { Experience as SharedExperience } from "shared";

describe("Experiences Services", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  describe("Create Experience", () => {
    it("Create Experience should create an experience", async () => {
      const user = await createTestUser();
      const experience = await ExperiencesService.createExperience(
        "Test Experience",
        "Test Description",
        "Test Company",
        "Test Location",
        user,
        [],
        new Date()
      );

      expectTypeOf(experience).toEqualTypeOf<SharedExperience>();
      expect(experience.title).toBe("Test Experience");
      expect(experience.description).toBe("Test Description");
      expect(experience.companyName).toBe("Test Company");
      expect(experience.location).toBe("Test Location");
      expect(experience.creator.id).toBe(user.id);
    });
  });

  describe("Update Experience", () => {
    it("Update Experience should update an experience", async () => {
      const user = await createTestUser();
      const experience = await ExperiencesService.createExperience(
        "Test Experience",
        "Test Description",
        "Test Company",
        "Test Location",
        user,
        [],
        new Date()
      );

      const updatedExperience = await ExperiencesService.updateExperience(
        experience.id,
        "Updated Experience",
        "Updated Description",
        "Updated Company",
        "Updated Location",
        user,
        [],
        new Date()
      );

      expectTypeOf(updatedExperience).toEqualTypeOf<SharedExperience>();
      expect(updatedExperience.title).toBe("Updated Experience");
      expect(updatedExperience.description).toBe("Updated Description");
      expect(updatedExperience.companyName).toBe("Updated Company");
      expect(updatedExperience.location).toBe("Updated Location");
      expect(updatedExperience.creator.id).toBe(user.id);
    });

    it("Update Experience should throw an error if experience not found", async () => {
      const user = await createTestUser();
      await expect(
        ExperiencesService.updateExperience(
          "123",
          "Updated Experience",
          "Updated Description",
          "Updated Company",
          "Updated Location",
          user,
          [],
          new Date()
        )
      ).rejects.toThrowError("Experience with id: 123 not found");
    });

    it("Update Experience should throw an error if experience is deleted", async () => {
      const user = await createTestUser();
      const experience = await ExperiencesService.createExperience(
        "Test Experience",
        "Test Description",
        "Test Company",
        "Test Location",
        user,
        [],
        new Date()
      );
      await ExperiencesService.deleteExperience(experience.id, user);
      await expect(
        ExperiencesService.updateExperience(
          experience.id,
          "Updated Experience",
          "Updated Description",
          "Updated Company",
          "Updated Location",
          user,
          [],
          new Date()
        )
      ).rejects.toThrowError(
        "Experience with id: " + experience.id + " has been deleted already!"
      );
    });

    it("Update Experience should throw an error if user is not the creator", async () => {
      const user = await createTestUser();
      const experience = await ExperiencesService.createExperience(
        "Test Experience",
        "Test Description",
        "Test Company",
        "Test Location",
        user,
        [],
        new Date()
      );
      const otherUser = await createTestUser({
        email: "joemama@gmail.com",
        password: "password",
        username: "joemama",
        role: "USER",
      });
      await expect(
        ExperiencesService.updateExperience(
          experience.id,
          "Updated Experience",
          "Updated Description",
          "Updated Company",
          "Updated Location",
          otherUser,
          [],
          new Date()
        )
      ).rejects.toThrowError("You can't update someone else's experience");
    });
  });

  describe("Delete Experience", () => {
    it("Delete Experience should delete an experience", async () => {
      const user = await createTestUser();
      const experience = await ExperiencesService.createExperience(
        "Test Experience",
        "Test Description",
        "Test Company",
        "Test Location",
        user,
        [],
        new Date()
      );
      await ExperiencesService.deleteExperience(experience.id, user);
      await expect(
        ExperiencesService.getExperienceById(experience.id)
      ).rejects.toThrowError(
        "Experience with id: " + experience.id + " has been deleted already!"
      );
    });

    it("Delete Experience should throw an error if experience not found", async () => {
      const user = await createTestUser();
      await expect(
        ExperiencesService.deleteExperience("123", user)
      ).rejects.toThrowError("Experience with id: 123 not found");
    });

    it("Delete Experience should throw an error if experience is deleted", async () => {
      const user = await createTestUser();
      const experience = await ExperiencesService.createExperience(
        "Test Experience",
        "Test Description",
        "Test Company",
        "Test Location",
        user,
        [],
        new Date()
      );
      await ExperiencesService.deleteExperience(experience.id, user);
      await expect(
        ExperiencesService.deleteExperience(experience.id, user)
      ).rejects.toThrowError(
        "Experience with id: " + experience.id + " has been deleted already!"
      );
    });

    it("Delete Experience should throw an error if user is not the creator", async () => {
      const user = await createTestUser();
      const experience = await ExperiencesService.createExperience(
        "Test Experience",
        "Test Description",
        "Test Company",
        "Test Location",
        user,
        [],
        new Date()
      );
      const otherUser = await createTestUser({
        email: "joemama@gmail.com",
        password: "password",
        username: "joemama",
        role: "USER",
      });
      await expect(
        ExperiencesService.deleteExperience(experience.id, otherUser)
      ).rejects.toThrowError("You can't delete someone else's experience");
    });
  });

  describe("Get Experience By Id", () => {
    it("Get Experience By Id should return an experience", async () => {
      const user = await createTestUser();
      const experience = await ExperiencesService.createExperience(
        "Test Experience",
        "Test Description",
        "Test Company",
        "Test Location",
        user,
        [],
        new Date()
      );
      const result = await ExperiencesService.getExperienceById(experience.id);
      expectTypeOf(result).toEqualTypeOf<SharedExperience>();
      expect(result.id).toBe(experience.id);
    });

    it("Get Experience By Id should throw an error if experience not found", async () => {
      await expect(
        ExperiencesService.getExperienceById("123")
      ).rejects.toThrowError("Experience with id: 123 not found");
    });

    it("Get Experience By Id should throw an error if experience is deleted", async () => {
      const user = await createTestUser();
      const experience = await ExperiencesService.createExperience(
        "Test Experience",
        "Test Description",
        "Test Company",
        "Test Location",
        user,
        [],
        new Date()
      );
      await ExperiencesService.deleteExperience(experience.id, user);
      await expect(
        ExperiencesService.getExperienceById(experience.id)
      ).rejects.toThrowError(
        "Experience with id: " + experience.id + " has been deleted already!"
      );
    });
  });

  describe("Get Experiences", () => {
    it("Get Experiences should return a list of experiences", async () => {
      const user = await createTestUser();
      const experience1 = await ExperiencesService.createExperience(
        "Test Experience",
        "Test Description",
        "Test Company",
        "Test Location",
        user,
        [],
        new Date()
      );
      const experience2 = await ExperiencesService.createExperience(
        "Test Experience 2",
        "Test Description 2",
        "Test Company 2",
        "Test Location 2",
        user,
        [],
        new Date()
      );
      const result = await ExperiencesService.getAllExperiences();
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(experience1.id);
      expect(result[1].id).toBe(experience2.id);
    });

    it("Get Experiences should return an empty list if no experiences", async () => {
      const result = await ExperiencesService.getAllExperiences();
      expect(result).toHaveLength(0);
    });
  });
});
