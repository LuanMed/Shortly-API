import { Router } from "express";
import { getUsersMe } from "../controllers/users.controller.js";
import { tokenValidation } from "../middlewares/validToken.js";

const usersRouter = Router();

usersRouter.get('/users/me', tokenValidation, getUsersMe);

export default usersRouter;