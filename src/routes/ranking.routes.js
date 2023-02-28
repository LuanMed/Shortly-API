import { Router } from "express";
import { visitRanking } from "../controllers/ranking.controller.js";

const rankingRouter = Router();

rankingRouter.get('/ranking', visitRanking);

export default rankingRouter;