import { User } from "shared";
import { prisma } from "../prisma/prisma";
import { userQueryArgs } from "../prisma-query-args/users.query-args";
import { userTransformer } from "../transformers/users.transformer";
import { NotFoundException } from "../utils/error.utils";

export default class UsersServices {
  static async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
      ...userQueryArgs,
    });

    return users.map(userTransformer);
  }

  static async login(userId: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      ...userQueryArgs,
    });

    if (!user) throw new NotFoundException("User", userId);

    return userTransformer(user);
  }
}
