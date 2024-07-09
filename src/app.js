import "dotenv/config.js";
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import { userRoutes } from "./routes/userRoutes.js";

const PORT = process.env.SERVER_PORT;
const URL = `http://localhost:${PORT}/users`;

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get("/", ctx => {
  ctx.body = `<html>rvdemonk server template</html>`;
});

userRoutes(router);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
