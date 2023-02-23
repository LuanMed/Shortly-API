import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { validSchema } from "../middlewares/validShema.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";


const authRouter = Router();

authRouter.post('/signup', validSchema(signUpSchema), signUp);
authRouter.post('/signin', validSchema(signInSchema), signIn);

export default authRouter;