import { Router } from "express";
import { tokenValidation } from "../middlewares/validToken";

const urlsRouter = Router();

urlsRouter.get('/urls/:id');
urlsRouter.get('/urls/open/:shortUrl');
urlsRouter.post('/urls/shorten', tokenValidation);
urlsRouter.delete('/urls/:id', tokenValidation);

export default urlsRouter;