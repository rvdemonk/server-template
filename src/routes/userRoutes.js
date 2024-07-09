import { createUser, fetchAllUsers } from "../controllers/userController.js";

export const userRoutes = (router) => {
  router.get("/users", fetchAllUsers);
  router.post("/users", createUser);
};
