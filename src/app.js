const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 3000;

const app = new Koa();
const router = new Router();

app.use(bodyParser());

userRoutes(router);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
