import { Router } from "express";
import { createShortUrl, getById } from "../controllers/urls.controller.js";
import { validSchema } from "../middlewares/validShema.js";
import { tokenValidation } from "../middlewares/validToken.js";
import { createShortSchema } from "../schemas/urls.schema.js";

const urlsRouter = Router();

urlsRouter.get('/urls/:id',getById);
urlsRouter.get('/urls/open/:shortUrl');
urlsRouter.post('/urls/shorten', tokenValidation, validSchema(createShortSchema), createShortUrl);
urlsRouter.delete('/urls/:id', tokenValidation);

export default urlsRouter;