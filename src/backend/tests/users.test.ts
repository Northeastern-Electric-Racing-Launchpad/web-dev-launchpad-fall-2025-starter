import { clearDatabase, createTestUser } from "./test.utils";
import UsersServices from "../src/services/users.services";
import { expect, beforeEach, describe, it } from "vitest";

describe("Users Services", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  describe("Get Users", () => {
    it("Get Users should return a list of users", async () => {
      const user1 = await createTestUser();
      const user2 = await createTestUser({
        email: "joemama@gmail.com",
        password: "password",
        username: "joemama",
        role: "USER",
      });

      const result = await UsersServices.getUsers();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(user1.id);
      expect(result[1].id).toBe(user2.id);
    });

    it("Get Users should return an empty list if no users", async () => {
      const result = await UsersServices.getUsers();

      expect(result).toHaveLength(0);
    });
  });

  describe("Login", () => {
    it("Login should return a user", async () => {
      const user = await createTestUser();

      const result = await UsersServices.login(user.id);

      expect(result.id).toBe(user.id);
      expect(result.email).toBe(user.email);
      expect(result.username).toBe(user.username);
      expect(result.role).toBe(user.role);
    });

    it("Login should throw an error if user not found", async () => {
      await expect(UsersServices.login("123")).rejects.toThrowError(
        "User with id: 123 not found"
      );
    });
  });
});
