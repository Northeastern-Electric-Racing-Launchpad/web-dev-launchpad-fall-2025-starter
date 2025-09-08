import { NextFunction, Request, Response } from "express";
import UsersServices from "../services/users.services";
import { AccessDeniedException } from "../utils/error.utils";

export default class UsersController {
  static async getUsers(_req: Request, response: Response, next: NextFunction) {
    try {
      const users = await UsersServices.getUsers();
      response.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (process.env.NODE_ENV === "production")
        throw new AccessDeniedException("Cant dev login on production!");

      const { userId } = req.body;
      const header = req.headers["user-agent"];

      if (!header) {
        throw new AccessDeniedException(
          "You cannot put an unknown for dev login!"
        );
      }

      const user = await UsersServices.login(userId);

      res.status(200).json(user);
    } catch (error: unknown) {
      next(error);
    }
  }
}
