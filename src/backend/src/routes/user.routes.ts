import express from "express";
import UsersController from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.get("/", UsersController.getUsers);
usersRouter.post("/auth/login", UsersController.login);
export default usersRouter;
