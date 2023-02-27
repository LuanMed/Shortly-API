import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.routes.js";
import rankingRouter from "./routes/ranking.routes.js";
import urlsRouter from "./routes/urls.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use([authRouter, usersRouter, urlsRouter, rankingRouter])

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor rodou na porta: ${process.env.PORT}`));