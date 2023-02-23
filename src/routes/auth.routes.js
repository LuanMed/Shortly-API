import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { validSchemaAuth } from "../middlewares/validShemaAuth.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";


const authRouter = Router();

authRouter.post('/signup', validSchemaAuth(signUpSchema), signUp);
authRouter.post('/signin', validSchemaAuth(signInSchema), signIn);

export default authRouter;